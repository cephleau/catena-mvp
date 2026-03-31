-- Catena Language Solutions — Database Schema
-- PostgreSQL + Supabase

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- USERS TABLE (auth)
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) NOT NULL DEFAULT 'client', -- 'client', 'interpreter', 'admin'
  
  -- Stripe IDs
  stripe_customer_id VARCHAR(255), -- For clients (billing)
  stripe_account_id VARCHAR(255),  -- For interpreters (payouts)
  
  -- Profile
  avatar_url TEXT,
  bio TEXT,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_stripe_customer_id ON users(stripe_customer_id);
CREATE INDEX idx_users_stripe_account_id ON users(stripe_account_id);

-- ============================================================================
-- INTERPRETERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS interpreters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  
  -- Specialization
  languages TEXT[] DEFAULT ARRAY['spanish'],
  specialization VARCHAR(100) DEFAULT 'medical', -- 'medical', 'legal', 'business'
  
  -- Rates & Availability
  hourly_rate NUMERIC(10, 2) DEFAULT 45.00,
  availability_status VARCHAR(50) DEFAULT 'available', -- 'available', 'unavailable', 'on-call'
  
  -- Credentials & Experience
  years_experience INT DEFAULT 0,
  credentials JSONB, -- {"certification": "CCHI", "expiry_date": "2027-06-15", ...}
  bio TEXT,
  
  -- Bank Account (encrypted)
  bank_account_last4 VARCHAR(4),
  bank_account_encrypted TEXT,
  
  -- Ratings & Stats
  average_rating NUMERIC(3, 2) DEFAULT 0.00,
  total_ratings INT DEFAULT 0,
  total_hours INT DEFAULT 0,
  total_earnings NUMERIC(15, 2) DEFAULT 0.00,
  total_bookings INT DEFAULT 0,
  
  -- Availability Calendar (JSON for flexibility)
  -- Example: {"Mon": {"9am-5pm": true}, "Tue": {"9am-5pm": true, "on-call": true}}
  availability_calendar JSONB,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_active TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT valid_hourly_rate CHECK (hourly_rate > 0),
  CONSTRAINT valid_years_experience CHECK (years_experience >= 0),
  CONSTRAINT valid_rating CHECK (average_rating >= 0 AND average_rating <= 5)
);

CREATE INDEX idx_interpreters_user_id ON interpreters(user_id);
CREATE INDEX idx_interpreters_availability_status ON interpreters(availability_status);
CREATE INDEX idx_interpreters_average_rating ON interpreters(average_rating DESC);
CREATE INDEX idx_interpreters_languages ON interpreters USING GIN(languages);

-- ============================================================================
-- CLIENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  
  -- Organization Info
  organization_name VARCHAR(255),
  organization_type VARCHAR(100), -- 'hospital', 'clinic', 'individual', 'agency'
  contact_title VARCHAR(100),
  
  -- Location
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(10),
  
  -- Billing
  payment_method_id VARCHAR(255), -- Stripe PaymentMethod ID
  
  -- Stats
  total_bookings INT DEFAULT 0,
  total_spent NUMERIC(15, 2) DEFAULT 0.00,
  average_rating NUMERIC(3, 2) DEFAULT 0.00,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_organization_type ON clients(organization_type);

-- ============================================================================
-- BOOKINGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  interpreter_id UUID REFERENCES interpreters(id) ON DELETE SET NULL,
  
  -- Scheduling
  scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
  scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
  actual_duration_minutes INT,
  
  -- Location & Context
  location VARCHAR(500), -- Physical address or "telehealth"
  location_type VARCHAR(50) DEFAULT 'in-person', -- 'in-person', 'telehealth'
  patient_name VARCHAR(255),
  appointment_type VARCHAR(100), -- 'consultation', 'surgery', 'follow-up', 'procedure'
  notes TEXT,
  
  -- Pricing
  client_rate NUMERIC(10, 2) NOT NULL DEFAULT 75.00,
  interpreter_rate NUMERIC(10, 2) NOT NULL DEFAULT 45.00,
  client_total NUMERIC(15, 2), -- Calculated after completion
  interpreter_total NUMERIC(15, 2), -- Calculated after completion
  catena_fee NUMERIC(15, 2), -- Catena commission
  
  -- Status
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'
  
  -- Ratings
  client_rating INT, -- 1-5
  client_review TEXT,
  interpreter_rating INT, -- 1-5
  interpreter_review TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT valid_client_rate CHECK (client_rate > 0),
  CONSTRAINT valid_interpreter_rate CHECK (interpreter_rate > 0),
  CONSTRAINT valid_client_rating CHECK (client_rating IS NULL OR (client_rating >= 1 AND client_rating <= 5)),
  CONSTRAINT valid_interpreter_rating CHECK (interpreter_rating IS NULL OR (interpreter_rating >= 1 AND interpreter_rating <= 5)),
  CONSTRAINT valid_scheduled_times CHECK (scheduled_start < scheduled_end)
);

CREATE INDEX idx_bookings_client_id ON bookings(client_id);
CREATE INDEX idx_bookings_interpreter_id ON bookings(interpreter_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled_start ON bookings(scheduled_start);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);

-- ============================================================================
-- PAYMENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- client user
  
  -- Payment Details
  amount NUMERIC(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Stripe Integration
  stripe_charge_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  
  -- Status
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'succeeded', 'failed', 'refunded'
  error_message TEXT,
  
  -- Metadata
  receipt_url TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT valid_amount CHECK (amount > 0)
);

CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_client_id ON payments(client_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_stripe_charge_id ON payments(stripe_charge_id);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);

-- ============================================================================
-- PAYOUTS TABLE (Interpreter Earnings)
-- ============================================================================

CREATE TABLE IF NOT EXISTS payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  interpreter_id UUID NOT NULL REFERENCES interpreters(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Payout Details
  amount NUMERIC(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Stripe Integration
  stripe_payout_id VARCHAR(255),
  
  -- Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Status
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'paid', 'failed'
  error_message TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT valid_amount CHECK (amount > 0),
  CONSTRAINT valid_period CHECK (period_start < period_end)
);

CREATE INDEX idx_payouts_interpreter_id ON payouts(interpreter_id);
CREATE INDEX idx_payouts_status ON payouts(status);
CREATE INDEX idx_payouts_period_start ON payouts(period_start);
CREATE INDEX idx_payouts_created_at ON payouts(created_at DESC);

-- ============================================================================
-- RATINGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  booking_id UUID NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  rater_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ratee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Rating Data
  score INT NOT NULL,
  review TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT valid_score CHECK (score >= 1 AND score <= 5),
  CONSTRAINT different_rater_ratee CHECK (rater_id != ratee_id)
);

CREATE INDEX idx_ratings_booking_id ON ratings(booking_id);
CREATE INDEX idx_ratings_rater_id ON ratings(rater_id);
CREATE INDEX idx_ratings_ratee_id ON ratings(ratee_id);

-- ============================================================================
-- NOTIFICATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Notification Details
  type VARCHAR(100) NOT NULL, -- 'booking_request', 'booking_accepted', 'booking_declined', 'payment_processed', 'payout_sent'
  title VARCHAR(255) NOT NULL,
  message TEXT,
  related_booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================================================
-- ROW-LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE interpreters ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users: Can only view their own profile
CREATE POLICY users_select ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY users_update ON users
  FOR UPDATE USING (auth.uid() = id);

-- Interpreters: Public profiles for clients, full access for owner
CREATE POLICY interpreters_select ON interpreters
  FOR SELECT USING (true); -- Public read

CREATE POLICY interpreters_update ON interpreters
  FOR UPDATE USING (auth.uid() = user_id);

-- Clients: Private, owner only
CREATE POLICY clients_select ON clients
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY clients_update ON clients
  FOR UPDATE USING (auth.uid() = user_id);

-- Bookings: View own bookings
CREATE POLICY bookings_select ON bookings
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM clients WHERE id = bookings.client_id
    ) OR
    auth.uid() IN (
      SELECT user_id FROM interpreters WHERE id = bookings.interpreter_id
    )
  );

CREATE POLICY bookings_insert ON bookings
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT user_id FROM clients WHERE id = client_id)
  );

CREATE POLICY bookings_update ON bookings
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM clients WHERE id = bookings.client_id
    ) OR
    auth.uid() IN (
      SELECT user_id FROM interpreters WHERE id = bookings.interpreter_id
    )
  );

-- Payments: View own payments
CREATE POLICY payments_select ON payments
  FOR SELECT USING (auth.uid() = user_id);

-- Payouts: View own payouts
CREATE POLICY payouts_select ON payouts
  FOR SELECT USING (auth.uid() = user_id);

-- Notifications: View own notifications
CREATE POLICY notifications_select ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY notifications_update ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- TRIGGERS (Auto-update timestamps)
-- ============================================================================

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_interpreters_timestamp
BEFORE UPDATE ON interpreters
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_clients_timestamp
BEFORE UPDATE ON clients
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_bookings_timestamp
BEFORE UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_payments_timestamp
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_payouts_timestamp
BEFORE UPDATE ON payouts
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_ratings_timestamp
BEFORE UPDATE ON ratings
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- ============================================================================
-- VIEWS
-- ============================================================================

-- Interpreter availability view
CREATE OR REPLACE VIEW interpreter_availability AS
SELECT
  i.id,
  i.user_id,
  u.full_name,
  u.email,
  i.languages,
  i.specialization,
  i.hourly_rate,
  i.availability_status,
  i.average_rating,
  COUNT(b.id) FILTER (WHERE b.status = 'completed') as completed_bookings
FROM interpreters i
JOIN users u ON i.user_id = u.id
LEFT JOIN bookings b ON i.id = b.interpreter_id
WHERE i.availability_status = 'available'
GROUP BY i.id, u.id;

-- Client booking history view
CREATE OR REPLACE VIEW client_booking_history AS
SELECT
  b.id,
  b.client_id,
  i.user_id as interpreter_user_id,
  u.full_name as interpreter_name,
  b.scheduled_start,
  b.scheduled_end,
  b.status,
  b.client_rating,
  b.location
FROM bookings b
JOIN interpreters i ON b.interpreter_id = i.id
JOIN users u ON i.user_id = u.id
ORDER BY b.scheduled_start DESC;

-- Interpreter earnings view
CREATE OR REPLACE VIEW interpreter_earnings_summary AS
SELECT
  i.id,
  i.user_id,
  u.full_name,
  COUNT(b.id) FILTER (WHERE b.status = 'completed') as completed_bookings,
  COALESCE(SUM(b.interpreter_total) FILTER (WHERE b.status = 'completed'), 0) as total_earned,
  COALESCE(SUM(b.actual_duration_minutes) FILTER (WHERE b.status = 'completed'), 0) as total_minutes,
  ROUND(COALESCE(SUM(b.actual_duration_minutes) FILTER (WHERE b.status = 'completed'), 0)::numeric / 60, 2) as total_hours
FROM interpreters i
JOIN users u ON i.user_id = u.id
LEFT JOIN bookings b ON i.id = b.interpreter_id
GROUP BY i.id, u.id;
