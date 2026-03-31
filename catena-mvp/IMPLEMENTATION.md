# Catena MVP — Implementation Roadmap

**Status:** Phase 1 (Foundation) — Waiting for Carlos approval on wireframes

---

## Phase 1: Foundation (Week 1) ✅ COMPLETE

### Deliverables Completed
- [x] GitHub repo scaffolding
- [x] Next.js + Tailwind boilerplate
- [x] TypeScript configuration
- [x] Supabase schema (complete ERD + RLS)
- [x] Landing page (hero, features, pricing, CTA)
- [x] UI component library (Button, utilities)
- [x] Environment configuration
- [x] Types/interfaces for all entities
- [x] Project documentation (README, PROJECT.md)

### Files Created
```
catena-mvp/
├── app/
│   ├── layout.tsx          ✅
│   └── page.tsx (landing)  ✅
├── components/
│   └── ui/
│       └── button.tsx      ✅
├── lib/
│   └── utils.ts            ✅
├── styles/
│   └── globals.css         ✅
├── supabase/
│   └── schema.sql          ✅
├── types/
│   └── index.ts            ✅
├── package.json            ✅
├── tsconfig.json           ✅
├── tailwind.config.ts      ✅
├── .env.example            ✅
├── README.md               ✅
└── PROJECT.md              ✅
```

### Next: **Carlos Approval Checkpoint**

Before Phase 2, need Carlos to review and approve:

1. **Landing Page** — Is the messaging/layout working?
   - Hero section selling points?
   - CTA effectiveness?
   - Design direction?

2. **Pricing Display** — $75/hour for clients, $45/hour for interpreters
   - Clear enough?
   - Any pricing changes needed?

3. **Auth Flow** — Split signup for clients vs. interpreters
   - Should we have role selection on signup page?
   - Email verification required?
   - Phone number required?

4. **Feature Priority** — Which features to build first in Phase 2?
   - Interpreter dashboard (view jobs, set availability)?
   - Client portal (request interpreter, browse)?
   - Both in parallel?

---

## Phase 2: Core Dashboards (Week 2)

### Interpreter Dashboard Components
```typescript
// /app/(dashboard)/interpreter/page.tsx
- Header (name, earnings, status toggle)
- Upcoming jobs (list + map view)
  - Job card (client name, location, time, pay)
  - Accept/decline buttons
  - Job details modal
- Availability calendar
  - Drag-to-select hours
  - Quick toggles (available, on-call, unavailable)
- Earnings summary
  - Total earned this week/month
  - Pending payouts
  - Completed hours
- Ratings + reviews
  - Average rating badge
  - Recent reviews from clients
- Profile settings
  - Bio, languages, credentials
  - Bank account for payouts
```

### Client Portal Components
```typescript
// /app/(dashboard)/client/page.tsx
- Request interpreter form
  - Date/time picker (calendar + time slots)
  - Duration selector (min 1 hour)
  - Location (address or telehealth)
  - Appointment type (consultation, surgery, etc.)
  - Special notes (patient language level, etc.)
- Browse available interpreters
  - Filter by availability, rating, experience
  - Interpreter cards (photo, rating, languages, bio)
  - "Book" CTA per interpreter
- Booking history
  - Past appointments
  - Ratings + reviews of interpreters
  - Invoice/receipt download
- Profile + payment method
  - Organization info
  - Billing address
  - Stripe payment method management
```

### Authentication Pages
```typescript
// /app/(auth)/signup/page.tsx
- Role selection: "I'm looking for an interpreter" / "I'm an interpreter"
- Email + password form
- Role-specific fields
  - Client: Organization name, contact title
  - Interpreter: Languages, experience, credentials
- Terms + privacy acceptance
- Submit → create user in Supabase
- Redirect to dashboard

// /app/(auth)/login/page.tsx
- Email + password form
- "Forgot password?" link
- Submit → JWT token → dashboard redirect

// /app/(auth)/forgot-password/page.tsx
- Email input
- "Send reset link" button
- Confirmation message
```

### API Routes (Phase 2)
```typescript
// Auth
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh

// Interpreters
GET /api/interpreters (search + filter)
GET /api/interpreters/:id
PUT /api/interpreters/:id (update profile, availability)
GET /api/interpreters/:id/earnings

// Clients
GET /api/clients/:id
PUT /api/clients/:id

// Bookings
GET /api/bookings (user's bookings)
POST /api/bookings (create new booking)
PUT /api/bookings/:id/status (update status)
```

### Database Queries Needed
- Get available interpreters by date/time
- Get interpreter profile + ratings
- Get client booking history
- Update interpreter availability
- Calculate earnings by period

### Carlos Approval Checkpoint #2

Before Phase 3, review:
1. Dashboard layouts — Do they work?
2. Form flows — Clear and intuitive?
3. Data display — Right information, right place?
4. Mobile responsiveness — Works on tablet/phone?

---

## Phase 3: Matching & Booking (Week 2-3)

### Real-Time Matching Algorithm
```typescript
// lib/matching.ts
function matchInterpretersToClient(booking: CreateBookingRequest) {
  // 1. Find interpreters available in time slot
  const available = interpreters.filter(i =>
    i.availability_calendar[booking.scheduled_start] &&
    i.availability_status === 'available'
  )

  // 2. Sort by:
  //    a. Distance (closest first)
  //    b. Rating (highest first)
  //    c. Availability confirmation (instant vs. pending)

  // 3. Return top 3 matches

  // 4. Client can:
  //    - Auto-match (system picks #1)
  //    - Browse all 3 and select
  //    - Request specific interpreter
}
```

### Booking Flow
```
Client submits request
  ↓
System matches interpreters
  ↓
Display matches to client (top 3)
  ↓
Client confirms selection
  ↓
Send notification to interpreter
  ↓
Interpreter accepts/declines (timeout: 5 min)
  ↓
If accepted: booking confirmed, client charges card
If declined: offer to next interpreter
If all decline: refund, alert client
```

### Notifications
```typescript
// Email + in-app notifications
- New job request to interpreter
- Booking accepted by interpreter
- Booking declined (offer alternatives)
- Client payment processed
- Booking reminder (24h, 1h before)
- Rating reminders (post-booking)
- Weekly earnings summary (interpreters)
```

### Components
- Booking confirmation modal
- Notification center (dropdown in nav)
- Email templates (SendGrid integration)
- Real-time status updates (Supabase Realtime)

---

## Phase 4: Payments (Week 3)

### Stripe Integration

#### Client Billing (Charge Card)
```typescript
// /api/payments/intent
POST /api/payments/intent
  booking_id: string
  amount: number (75 * hours)
  →
  POST /stripe/payment_intents
  →
  return { clientSecret, amount, status }

// Frontend
const { error } = await stripe.confirmCardPayment(clientSecret)
if (!error) {
  booking.status = 'confirmed'
  send notification to interpreter
}
```

#### Interpreter Payouts (Stripe Connect)
```typescript
// Weekly payout job (cron)
1. Calculate earnings: completed bookings × $45/hour
2. Sum by interpreter
3. Create payout in payouts table
4. POST /stripe/payouts
   interpreter.stripe_account_id
   amount
   period_start, period_end
5. Mark payout.status = 'processing'
6. Stripe calls /api/webhooks/stripe
7. Update payout.status = 'paid'
8. Send email confirmation to interpreter
```

### Invoice Generation
```typescript
// /api/invoices/:booking_id
- Client invoice (shows charge amount)
- Interpreter invoice (shows earned amount)
- PDF generation (PDFKit or Stripe-hosted)
```

### Webhook Handling
```typescript
// /api/webhooks/stripe
POST /api/webhooks/stripe
  - payment_intent.succeeded
  - charge.succeeded
  - charge.failed
  - payout.paid
  - payout.failed
  →
  update bookings, payments, payouts tables
  →
  send notifications
```

### UI Components
- Stripe card input form
- Payment confirmation
- Invoice view/download
- Payout history (interpreters)
- Payment history (clients)

---

## Phase 5: Deployment (Week 4)

### Supabase Setup
```bash
# Create production project
supabase projects create --name catena-prod

# Run migrations
supabase db push

# Configure RLS
# Enable on all tables
# Create policies for auth

# Set webhook secret for Stripe
```

### Netlify Setup
```bash
# Connect GitHub repo
# Set environment variables
# Configure redirects (SPA)
netlify.toml:
  [build]
    command = "npm run build"
    functions = "api"
    publish = ".next"

# Deploy
```

### DNS Configuration
```
catenalanguagepartners.com
  A → Netlify IP
  CNAME → Netlify domain
  MX → SendGrid (for transactional emails)
```

### Pre-Launch Checklist
- [ ] All API routes tested
- [ ] Database RLS verified
- [ ] Stripe webhook receiving events
- [ ] Email notifications sending
- [ ] Payment flow end-to-end
- [ ] Payout flow end-to-end
- [ ] Mobile responsiveness tested
- [ ] Load testing (100 concurrent users)
- [ ] Security audit
  - [ ] No sensitive data in logs
  - [ ] HTTPS only
  - [ ] CSRF protection
  - [ ] SQL injection prevention (Supabase handles)
  - [ ] XSS prevention

### Launch
```bash
# Final checks
npm run build
npm test

# Deploy to production
git push origin main
  →
  Netlify auto-deploys
  →
  https://catenalanguagepartners.com live

# Monitor
- Sentry (error tracking)
- LogRocket (session replay)
- Stripe Dashboard (payments)
```

---

## API Endpoint Summary

### Auth
- `POST /api/auth/signup` — Register user
- `POST /api/auth/login` — Login (returns JWT)
- `POST /api/auth/logout` — Clear session
- `POST /api/auth/refresh` — Refresh token
- `POST /api/auth/forgot-password` — Send reset email
- `POST /api/auth/reset-password` — Reset password

### Interpreters
- `GET /api/interpreters` — Search available (filters: date, location, rating)
- `GET /api/interpreters/:id` — Get profile
- `PUT /api/interpreters/:id` — Update profile
- `PUT /api/interpreters/:id/availability` — Set calendar
- `GET /api/interpreters/:id/earnings` — Earnings summary
- `GET /api/interpreters/:id/bookings` — Job history
- `GET /api/interpreters/:id/ratings` — Reviews

### Clients
- `GET /api/clients/:id` — Get profile
- `PUT /api/clients/:id` — Update profile
- `GET /api/clients/:id/bookings` — Booking history
- `POST /api/clients/:id/payment-method` — Save card

### Bookings
- `POST /api/bookings` — Create booking request
- `GET /api/bookings` — Get user's bookings (filtered by role)
- `GET /api/bookings/:id` — Get booking details
- `PUT /api/bookings/:id` — Update booking (status, notes)
- `POST /api/bookings/:id/accept` — Interpreter accepts
- `POST /api/bookings/:id/decline` — Interpreter declines
- `POST /api/bookings/:id/complete` — Mark completed
- `POST /api/bookings/:id/rate` — Submit rating

### Payments
- `POST /api/payments/intent` — Create Stripe payment intent
- `POST /api/payments/confirm` — Confirm payment
- `GET /api/payments` — Get payment history
- `GET /api/payments/:id` — Get receipt
- `POST /api/payments/:id/refund` — Refund payment

### Webhooks
- `POST /api/webhooks/stripe` — Handle Stripe events

---

## Testing Strategy

### Unit Tests
```typescript
// lib/__tests__/matching.test.ts
- matchInterpretersToClient() filters correctly
- formatCurrency() displays properly
- calculateDuration() computes minutes

// lib/__tests__/utils.test.ts
- formatDate() / formatTime()
- calculateBookingCost() rounds hours up
```

### Integration Tests
```typescript
// __tests__/auth.integration.test.ts
- User signup → Supabase user created
- User login → JWT returned
- Protected route → requires JWT

// __tests__/bookings.integration.test.ts
- Create booking → matching algorithm runs
- Accept job → notification sent
- Complete booking → payment charged
```

### E2E Tests (Playwright)
```typescript
// e2e/client-booking-flow.spec.ts
1. Sign up as client
2. Browse interpreters
3. Book appointment
4. Pay with Stripe test card
5. Confirm booking

// e2e/interpreter-job-flow.spec.ts
1. Sign up as interpreter
2. Set availability
3. Receive job notification
4. Accept job
5. View earnings

// e2e/full-flow.spec.ts
1. Client books interpreter
2. Interpreter accepts
3. Booking completed
4. Both rate each other
5. Interpreter receives payout
```

---

## Performance & Scalability

### Database Optimization
- Index on: `users.email`, `interpreters.availability_status`, `bookings.scheduled_start`
- Views for common queries (availability, earnings, history)
- Pagination on list endpoints (20 per page)

### Caching
- Cache interpreter list in Redis (5 min TTL)
- Cache user profile (10 min TTL)
- Invalidate on update

### Rate Limiting
- 100 requests/minute per IP
- 1000 requests/day per user
- Stripe API: built-in rate limiting

### CDN
- Netlify Edge Functions for static assets
- Images: Cloudinary for optimization

---

## Future Enhancements (v1.1+)

### Phase 6: Analytics Dashboard
- Revenue by interpreter, client, time period
- Booking trends
- Ratings distribution
- Utilization rates

### Phase 7: Mobile App
- React Native
- Push notifications
- Calendar integration
- In-app calling (Twilio)

### Phase 8: Multi-Language
- Add more languages (ASL, Somali, Amharic, Mandarin)
- Language-specific pricing
- Broader market expansion

### Phase 9: Admin Panel
- Manage users, bookings, disputes
- Payment reconciliation
- Analytics + reporting
- Interpreter credential verification

### Phase 10: Video Call Integration
- In-app video appointments
- Telehealth support
- Recording (with consent)
- Screen share

---

## Tech Debt / Known Limitations

1. **Real-time matching** — Currently rule-based (availability + rating). Future: ML-based matching
2. **Email notifications** — Using SendGrid; future: push notifications, SMS
3. **Video calls** — Not in MVP; future: Twilio integration
4. **Multi-language** — Spanish only in MVP; future: expand
5. **Mobile app** — Web-only in MVP; future: React Native
6. **Analytics** — Manual tracking; future: Segment + Mixpanel

---

## Success Metrics

### MVP Launch
- ✅ Landing page live
- ✅ Auth working (email verification)
- ✅ First 5 interpreters registered
- ✅ First booking completed
- ✅ Payment processing working
- ✅ Interpreter payout working

### First 30 Days
- 50 interpreters signed up
- 100 clients signed up
- 50 bookings completed
- $3,750+ revenue (50 bookings × $75)
- 95%+ on-time delivery
- 4.5+ average rating

### First 90 Days
- 200 interpreters
- 500 clients
- 500 bookings completed
- $37,500 revenue
- 10+ partnerships (hospitals, clinics)

---

_Last updated: 2026-03-28 21:41 MDT_
_Ready for Phase 2 once Carlos approves wireframes._
