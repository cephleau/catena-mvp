# Phase 2 Setup Guide

This guide walks you through setting up Catena MVP Phase 2 locally.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier OK)
- Stripe account (test mode)
- Git

## Step 1: Clone & Install

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
npm install
```

## Step 2: Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your keys:

```bash
# Supabase (from https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Stripe (from https://dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Step 3: Set Up Supabase

### 3.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy URL + anon key to `.env.local`

### 3.2 Deploy Database Schema
```bash
supabase db push
```

This will:
- Create all 8 tables (users, interpreters, clients, bookings, payments, payouts, ratings, notifications)
- Enable row-level security (RLS)
- Create indexes for performance
- Create views for common queries

### 3.3 Test Supabase Connection
```bash
npm run dev
# Open http://localhost:3000/signup
# Try creating an account — it should save to Supabase
```

## Step 4: Set Up Stripe

### 4.1 Get API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Switch to **Test Mode**
3. Go to **API Keys** section
4. Copy **Secret Key** and **Publishable Key** to `.env.local`

### 4.2 Set Up Webhook
```bash
# In another terminal, install Stripe CLI
brew install stripe/stripe-cli/stripe

# Authenticate
stripe login

# Start webhook forwarding to localhost
npm run stripe:listen
# You'll get: whsec_... copy this to STRIPE_WEBHOOK_SECRET in .env.local
```

### 4.3 Test Stripe Integration
1. Go to `http://localhost:3000/client/book`
2. Fill in booking form
3. Submit — should create PaymentIntent
4. In Stripe webhook terminal, you should see events

## Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 6: Test the Full Flow

### Test Client Booking Flow
1. Go to `/signup`
2. Select "Healthcare Provider" role
3. Sign up with email + password
4. You're auto-redirected to `/client` dashboard
5. Click "Book New Interpreter"
6. Fill in booking form:
   - Patient name: "John Doe"
   - Appointment type: "Consultation"
   - Service type: "Telehealth"
   - Date: Tomorrow
   - Time: 2:00 PM
   - Duration: 1 hour
7. Click "Continue to Payment"
8. Review booking details
9. Click "Pay $75"
10. In Stripe webhook terminal, you should see `payment_intent.succeeded`
11. Booking should now be confirmed

### Test Interpreter Dashboard
1. Open new incognito window (stay signed in as client in first window)
2. Go to `/signup`
3. Select "Interpreter" role
4. Sign up with different email
5. You're auto-redirected to `/interpreter` dashboard
6. You should see "No upcoming jobs" initially
7. Go back to first window (client), create another booking
8. Refresh interpreter window
9. New pending job should appear
10. Click job card
11. Click "Accept Job"
12. Job status should change to "confirmed"
13. Click "Mark as Completed"
14. Job should move to "Completed Jobs" tab
15. Earnings should update

## Step 7: Understanding the Architecture

### Auth Flow
```
User → Sign up/login → Supabase Auth
                    ↓
                JWT token
                    ↓
            Stored in localStorage
                    ↓
            AuthProvider (context)
                    ↓
            All pages + components
```

### Booking Flow
```
Client submits form
        ↓
POST /api/bookings
        ↓
Create booking in Supabase
        ↓
Return booking ID
        ↓
Show confirmation UI
        ↓
POST /api/payments/intent
        ↓
Create Stripe PaymentIntent
        ↓
Return clientSecret
        ↓
Submit payment (in production)
        ↓
Stripe webhook → /api/webhooks/stripe
        ↓
Update booking status → "confirmed"
        ↓
Create payment record
```

### Job Management Flow
```
Interpreter sees pending job
        ↓
Click "Accept Job"
        ↓
interpreterAPI.acceptJob()
        ↓
PUT /interpreters/:id/bookings/:id
        ↓
Update: interpreter_id, status = "confirmed"
        ↓
Update UI (optimistic)
        ↓
Start 30-sec refresh timer
```

## Step 8: File Structure Overview

```
Phase 2 adds:
├── app/
│   ├── (auth)/                    # Auth pages
│   ├── (dashboard)/               # Protected dashboards
│   └── api/                       # API routes
├── components/
│   ├── booking-form.tsx           # Multi-step form
│   └── interpreter-dashboard.tsx  # Job dashboard
├── lib/
│   ├── auth-context.tsx           # Auth state
│   ├── api-client.ts              # API helpers + retry
│   └── supabase-client.ts         # Supabase client
└── PHASE2_SUMMARY.md              # Full documentation
```

## Troubleshooting

### "Can't connect to Supabase"
```bash
# Check .env.local has correct URL + key
cat .env.local | grep SUPABASE

# Verify Supabase project is running
# Go to supabase.com → your project → check Status
```

### "Payment intent creation fails"
```bash
# Check Stripe keys
echo $STRIPE_SECRET_KEY
echo $STRIPE_PUBLISHABLE_KEY

# Verify they're in test mode (sk_test_, pk_test_)
# If production keys, sign out and restart dev server
```

### "Webhook events not showing"
```bash
# Stop npm run stripe:listen (Ctrl+C)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copy new whsec_ key to .env.local
# Restart npm run dev
```

### "Auth not persisting between page reloads"
```bash
# Check browser localStorage
# Open DevTools → Application → Local Storage
# Should see catena_user key with user data

# If not, check Supabase Auth is enabled
# Go to supabase.com → Auth → Providers
# Email should be enabled (usually is by default)
```

### "Booking not appearing for interpreter"
```bash
# Check booking was created in Supabase
# Go to supabase.com → SQL Editor
# Run: SELECT * FROM bookings;
# If booking exists, check:
# - Booking.status = 'pending' or 'confirmed'?
# - Booking.scheduled_start > NOW()?
# - Interpreter exists in interpreters table?

# If not, create interpreter profile:
INSERT INTO interpreters (user_id, specialization, languages)
VALUES ('user-id-here', 'medical', '["spanish"]');
```

## Next Steps

Once everything is working locally:

1. **Add Email Notifications** (Phase 3)
   - Integrate SendGrid
   - Send email when job received/accepted/completed

2. **Add Real-Time Matching** (Phase 3)
   - Auto-match interpreters to booking
   - Offer alternatives if decline

3. **Add Video Calls** (Phase 4)
   - Integrate Twilio/Zoom
   - Record sessions (with consent)

4. **Deploy to Production** (Phase 5)
   - Connect GitHub to Netlify
   - Push to main branch → auto-deploy
   - Set up production Supabase project
   - Configure Stripe webhooks for production

## Testing Checklist

- [ ] Sign up as client works
- [ ] Sign up as interpreter works
- [ ] Sign in works
- [ ] Client can create booking
- [ ] Booking appears for interpreter
- [ ] Interpreter can accept job
- [ ] Job status changes to confirmed
- [ ] Interpreter can complete job
- [ ] Completed job appears in past bookings
- [ ] Earnings update correctly
- [ ] Client dashboard shows bookings
- [ ] Sign out clears localStorage

## Questions?

See:
- `PHASE2_SUMMARY.md` — Complete Phase 2 overview
- `IMPLEMENTATION.md` — Full roadmap (Phases 2-5)
- `API_REFERENCE.md` — API endpoint docs

---

**Build complete. Happy testing!** 🐙
