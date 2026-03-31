# Catena Language Solutions — MVP Platform

**Domain:** catenalanguagepartners.com
**Timeline:** 2-4 weeks to launch
**Status:** Building (phase 1)

---

## Business Model (LOCKED)

| Aspect | Details |
|--------|---------|
| **Service** | Medical interpretation (Spanish) |
| **Client Rate** | $75/hour (minimum 1 hour) |
| **Interpreter Pay** | $45/hour |
| **Catena Margin** | 40% ($30/hour) |
| **Booking Model** | Hourly slots, web platform |

---

## MVP Scope (LOCKED)

### 1. Landing Page
- Catena pitch + value prop (medical interpretation specialists)
- Hero CTA: "Request Interpreter" (client) / "Join as Interpreter" (recruiter)
- Services overview (Spanish medical, response time, availability)
- About section
- Contact/FAQ

### 2. Interpreter Dashboard
- View available jobs (client name, location, duration, pay)
- Accept/decline jobs
- Set availability (calendar view)
- View earnings (total, pending, paid)
- Profile management (languages, credentials, rates)
- Past bookings & ratings

### 3. Client Portal
- Request interpreter (date, time, duration, location)
- Browse/select available interpreters
- Book appointment
- View booking history
- Manage profile + payment method
- Ratings & feedback

### 4. Real-Time Matching
- Match clients to available interpreters
- Auto-suggest top matches (availability, ratings, location)
- Client can confirm or request different interpreter
- Booking confirmation → payment processing

### 5. Stripe Integration
- **Client billing:** Charge on booking confirmation (or appointment end)
- **Interpreter payouts:** Pay weekly/bi-weekly to bank account
- Invoice history for both parties

---

## Tech Stack (LOCKED)

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js (React) + Tailwind CSS + TypeScript |
| **Hosting** | Netlify |
| **Backend/API** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth (email/password) |
| **Payments** | Stripe (billing & payouts) |
| **Real-time** | Supabase Realtime (job matching, notifications) |
| **Email** | SendGrid or Supabase built-in |

---

## Database Schema (v1)

### Users Table
```sql
users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR,
  full_name VARCHAR,
  phone VARCHAR,
  role ENUM ('client', 'interpreter', 'admin'),
  stripe_customer_id VARCHAR,
  stripe_account_id VARCHAR (for interpreters),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Interpreters Table
```sql
interpreters (
  id UUID PRIMARY KEY,
  user_id UUID (FOREIGN KEY),
  languages JSON ['spanish'],
  specialization VARCHAR ('medical'),
  hourly_rate NUMERIC (45.00),
  bio TEXT,
  years_experience INT,
  credentials JSON,
  availability JSON (calendar availability),
  ratings NUMERIC,
  total_hours INT,
  bank_account VARCHAR (encrypted),
  created_at TIMESTAMP
)
```

### Clients Table
```sql
clients (
  id UUID PRIMARY KEY,
  user_id UUID (FOREIGN KEY),
  company_name VARCHAR,
  contact_person VARCHAR,
  location VARCHAR,
  industry VARCHAR,
  total_spent NUMERIC,
  payment_method_id VARCHAR (Stripe),
  created_at TIMESTAMP
)
```

### Bookings Table
```sql
bookings (
  id UUID PRIMARY KEY,
  client_id UUID,
  interpreter_id UUID,
  scheduled_start TIMESTAMP,
  scheduled_end TIMESTAMP,
  actual_duration INT (minutes),
  location VARCHAR,
  status ENUM ('pending', 'confirmed', 'completed', 'cancelled'),
  client_rate NUMERIC (75.00),
  interpreter_rate NUMERIC (45.00),
  notes TEXT,
  rating INT (1-5),
  created_at TIMESTAMP
)
```

### Payments Table
```sql
payments (
  id UUID PRIMARY KEY,
  booking_id UUID,
  user_id UUID (client),
  amount NUMERIC (75.00+),
  stripe_charge_id VARCHAR,
  status ENUM ('pending', 'succeeded', 'failed'),
  created_at TIMESTAMP
)
```

### Payouts Table
```sql
payouts (
  id UUID PRIMARY KEY,
  interpreter_id UUID,
  amount NUMERIC,
  stripe_payout_id VARCHAR,
  status ENUM ('pending', 'paid', 'failed'),
  payout_date TIMESTAMP,
  period_start TIMESTAMP,
  period_end TIMESTAMP
)
```

---

## Build Phases

### Phase 1: Foundation (Week 1)
- [ ] GitHub repo + README
- [ ] Supabase project setup + schema
- [ ] Next.js + Tailwind boilerplate
- [ ] Basic auth (Supabase)
- [ ] Landing page wireframe
- [ ] **Carlos review → approval**

### Phase 2: Core Dashboards (Week 2)
- [ ] Interpreter dashboard UI + API
- [ ] Client portal UI + API
- [ ] Availability calendar (interpreter)
- [ ] Booking request form (client)
- [ ] **Carlos review → approval**

### Phase 3: Matching & Booking (Week 2-3)
- [ ] Real-time job matching algorithm
- [ ] Booking confirmation flow
- [ ] Notifications (email/in-app)
- [ ] **Carlos review → approval**

### Phase 4: Payments (Week 3)
- [ ] Stripe integration (client billing)
- [ ] Stripe Connect (interpreter payouts)
- [ ] Invoice generation
- [ ] **Carlos review → approval**

### Phase 5: Deployment (Week 4)
- [ ] Netlify + Supabase prod setup
- [ ] DNS → catenalanguagepartners.com
- [ ] Load testing
- [ ] **LAUNCH**

---

## First Deliverable

**Wireframes + component list** (before code)
- Landing page layout
- Interpreter dashboard layout
- Client portal layout
- Data flow diagram
- API endpoints list

**Goal:** Carlos approval before Phase 1 code begins.

---

## Notes

- **Scalability:** Schema designed for 1000s of interpreters, 10000s of bookings
- **MVP simplicity:** No custom matching AI initially (rule-based: location, availability, rating)
- **Security:** Passwords hashed, Stripe PCI-compliant, no payment data stored locally
- **Future:** Analytics, advanced matching, multi-language support (v2), mobile app (v3)

---

_Sub-agent: Octo | Build started: 2026-03-28 21:41 MDT_
