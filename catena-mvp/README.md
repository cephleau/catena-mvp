# Catena Language Solutions — Medical Interpretation Platform

Medical interpretation platform for Spanish-speaking patients and healthcare providers. Real-time interpreter booking, availability management, and secure payments.

**[Live Demo](https://catenalanguagepartners.netlify.app)** | **[Web App](https://catenalanguagepartners.com)**

---

## Features

### For Patients & Healthcare Providers (Clients)
- Browse available Spanish medical interpreters
- Book same-day or scheduled appointments
- Secure payment via Stripe
- View booking history & receipts
- Rate interpreters

### For Medical Interpreters
- View incoming job requests
- Set availability calendar
- Accept/decline jobs
- Track earnings in real-time
- Direct deposit payouts

### For Administrators
- Monitor all bookings & payments
- Manage interpreter credentials
- Handle disputes & ratings
- View analytics & revenue

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 + React 18 + TypeScript |
| **Styling** | Tailwind CSS |
| **Backend** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth (JWT) |
| **Payments** | Stripe + Stripe Connect |
| **Hosting** | Netlify |
| **Real-time** | Supabase Realtime subscriptions |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier OK)
- Stripe account (test mode)
- Netlify account

### Installation

```bash
# Clone the repo
git clone https://github.com/cephleau/catena-mvp.git
cd catena-mvp

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run dev server
npm run dev
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

```bash
# Run migrations
npm run db:migrate

# Seed sample data (dev only)
npm run db:seed
```

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
catena-mvp/
├── app/                      # Next.js app directory
│   ├── (auth)/               # Auth pages (login, signup)
│   ├── (dashboard)/          # Protected routes
│   │   ├── client/           # Client portal
│   │   ├── interpreter/      # Interpreter dashboard
│   │   └── admin/            # Admin dashboard
│   ├── api/                  # API routes
│   │   ├── auth/
│   │   ├── bookings/
│   │   ├── interpreters/
│   │   ├── payments/
│   │   └── webhooks/         # Stripe webhooks
│   ├── page.tsx              # Landing page
│   └── layout.tsx            # Root layout
├── components/               # Reusable components
│   ├── ui/                   # Base UI (buttons, forms, etc.)
│   ├── bookings/             # Booking-related components
│   ├── dashboards/           # Dashboard components
│   └── navigation/           # Nav, sidebar, etc.
├── lib/                      # Utilities
│   ├── supabase.ts           # Supabase client
│   ├── stripe.ts             # Stripe utilities
│   ├── auth.ts               # Auth helpers
│   └── db.ts                 # Database queries
├── styles/                   # Global CSS
├── types/                    # TypeScript types
├── supabase/                 # Migration files
│   └── migrations/
├── public/                   # Static assets
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## API Endpoints (v1)

### Auth
- `POST /api/auth/signup` — Register (client or interpreter)
- `POST /api/auth/login` — Login
- `POST /api/auth/logout` — Logout
- `POST /api/auth/refresh` — Refresh JWT

### Interpreters
- `GET /api/interpreters` — List available interpreters (filtered by date/time)
- `GET /api/interpreters/:id` — Get interpreter profile
- `PUT /api/interpreters/:id` — Update profile & availability
- `GET /api/interpreters/:id/earnings` — Get interpreter earnings

### Bookings
- `POST /api/bookings` — Create booking request
- `GET /api/bookings` — List user's bookings
- `GET /api/bookings/:id` — Get booking details
- `PUT /api/bookings/:id/accept` — Interpreter accepts job
- `PUT /api/bookings/:id/decline` — Interpreter declines job
- `PUT /api/bookings/:id/complete` — Mark booking complete
- `PUT /api/bookings/:id/rate` — Submit rating

### Payments
- `POST /api/payments/intent` — Create Stripe payment intent
- `POST /api/payments/confirm` — Confirm payment
- `GET /api/payments` — List payment history

### Webhooks
- `POST /api/webhooks/stripe` — Handle Stripe events (charges, payouts, etc.)

---

## Development Workflow

### Feature Branch Workflow
```bash
# Create feature branch
git checkout -b feature/interpreter-dashboard

# Commit changes
git add .
git commit -m "feat: add interpreter dashboard"

# Push to GitHub
git push origin feature/interpreter-dashboard

# Create PR → review → merge
```

### Testing
```bash
# Unit tests (Jest)
npm test

# Integration tests
npm run test:integration

# E2E tests (Playwright)
npm run test:e2e
```

---

## Deployment

### Netlify (Frontend)

```bash
# Connect GitHub repo to Netlify
# Set environment variables in Netlify dashboard
# Auto-deploy on push to main
```

### Supabase (Backend)

```bash
# Supabase dashboard: set production environment variables
# Enable row-level security (RLS) on all tables
# Configure Stripe webhook integration
```

---

## Roadmap

### Phase 1: Foundation ✅
- [x] Project setup + boilerplate
- [x] Landing page (hero, features, pricing, CTA)
- [x] Database schema (8 tables, RLS, views)
- [x] TypeScript types + utilities
- [x] UI component library

### Phase 2: Core Features ✅
- [x] Auth system (signup, login, logout)
- [x] Client booking form (multi-step, validation, real-time cost)
- [x] Interpreter dashboard (job list, earnings tracking, accept/decline/complete)
- [x] Client dashboard (booking history, upcoming jobs)
- [x] API routes (bookings, payments, webhooks)
- [x] Stripe payment intent integration
- [x] Exponential backoff retry logic
- [x] Error handling + user notifications

### Phase 3: Matching & Notifications
- [ ] Real-time interpreter matching algorithm
- [ ] Email notifications (SendGrid)
- [ ] In-app notification center
- [ ] Job timeout (5 min auto-decline)
- [ ] Alternative interpreter offering

### Phase 4: Payments & Advanced Features
- [ ] Stripe Elements embedded form
- [ ] 3D Secure verification
- [ ] Invoice generation (PDF)
- [ ] Interpreter payouts (Stripe Connect)
- [ ] Advanced availability calendar
- [ ] Video call integration (Twilio)
- [ ] In-app messaging

### Phase 5: Deployment & Scale
- [ ] Production database setup
- [ ] Netlify deployment
- [ ] DNS configuration
- [ ] Load testing + performance tuning
- [ ] Security audit
- [ ] Analytics integration (Segment, Mixpanel)
- [ ] Mobile app (React Native)

---

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "feat: add feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

---

## Support

For questions or issues:
- GitHub Issues: [Report a bug](https://github.com/cephleau/catena-mvp/issues)
- Email: support@catenalanguagepartners.com
- Docs: [Wiki](https://github.com/cephleau/catena-mvp/wiki)

---

## License

Proprietary — Catena Language Solutions, LLC

---

**Built with 🐙 by Octo for Carlos Cadena**
