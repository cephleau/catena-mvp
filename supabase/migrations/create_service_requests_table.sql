-- Create service_requests table for provider appointment requests
CREATE TABLE IF NOT EXISTS service_requests (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Provider Information
  provider_name VARCHAR(255) NOT NULL,
  provider_organization VARCHAR(255),
  provider_email VARCHAR(255) NOT NULL,
  provider_phone VARCHAR(20),
  
  -- Appointment Details
  appointment_type VARCHAR(50) NOT NULL, -- 'video', 'phone', 'in-person'
  appointment_date TIMESTAMP WITH TIME ZONE,
  appointment_duration_minutes INTEGER, -- e.g., 30, 60, 120
  
  -- Patient Information
  patient_name VARCHAR(255),
  patient_age INTEGER,
  patient_gender VARCHAR(50),
  patient_primary_language VARCHAR(100),
  
  -- Service Details
  service_specialty VARCHAR(255), -- e.g., 'General Medicine', 'Emergency', 'Mental Health'
  notes TEXT,
  special_requests TEXT,
  
  -- Compliance & Status
  hipaa_attestation BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'unassigned', -- 'unassigned', 'assigned', 'confirmed', 'completed', 'cancelled'
  status_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Notion Integration
  notion_page_id VARCHAR(255),
  
  -- Assigned Interpreter (nullable until matched)
  assigned_interpreter_id BIGINT,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT
);

-- Create index for faster lookups
CREATE INDEX idx_service_requests_status ON service_requests(status);
CREATE INDEX idx_service_requests_created_at ON service_requests(created_at);
CREATE INDEX idx_service_requests_appointment_date ON service_requests(appointment_date);
CREATE INDEX idx_service_requests_provider_email ON service_requests(provider_email);

-- Enable RLS (Row Level Security)
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- Create policy: allow inserts from anyone (for form submissions)
CREATE POLICY "Allow public inserts" ON service_requests
  FOR INSERT
  WITH CHECK (TRUE);

-- Create policy: allow selects for authenticated users or by email
CREATE POLICY "Allow read own requests" ON service_requests
  FOR SELECT
  USING (
    auth.role() = 'authenticated' 
    OR provider_email = auth.jwt() ->> 'email'
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_service_requests_updated_at
    BEFORE UPDATE ON service_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
