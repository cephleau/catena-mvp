# Catena API Reference

**Base URL:** `https://catenalanguagepartners.com/api` (production) | `http://localhost:3000/api` (development)

**Authentication:** Bearer token in `Authorization` header after login

---

## Authentication Endpoints

### Sign Up
```http
POST /api/auth/signup

{
  "email": "user@example.com",
  "password": "secure-password",
  "full_name": "John Doe",
  "role": "client" | "interpreter",
  // Role-specific fields:
  "organization_name": "Denver General Hospital", // client
  "languages": ["spanish"], // interpreter
  "years_experience": 5 // interpreter
}

Response:
{
  "success": true,
  "data": {
    "user": { User object },
    "session": {
      "access_token": "eyJ...",
      "refresh_token": "eyJ...",
      "expires_in": 3600
    }
  }
}
```

### Login
```http
POST /api/auth/login

{
  "email": "user@example.com",
  "password": "secure-password"
}

Response:
{
  "success": true,
  "data": {
    "user": { User object },
    "session": { ... }
  }
}
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Forgot Password
```http
POST /api/auth/forgot-password

{
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "Check your email for password reset link"
}
```

---

## Interpreter Endpoints

### List Available Interpreters
```http
GET /api/interpreters?date=2026-04-01&time=14:00&location=Denver

Query Parameters:
- date (YYYY-MM-DD) — Filter by availability
- time (HH:MM) — Time slot
- location (string) — City/location
- language (string) — Filter by language
- min_rating (number) — Minimum rating (0-5)
- sort (string) — "rating", "availability", "distance"

Response:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "full_name": "Maria Garcia",
      "languages": ["spanish"],
      "specialization": "medical",
      "hourly_rate": 45,
      "years_experience": 7,
      "average_rating": 4.8,
      "total_ratings": 42,
      "bio": "Certified medical interpreter...",
      "availability_status": "available"
    },
    ...
  ]
}
```

### Get Interpreter Profile
```http
GET /api/interpreters/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "full_name": "Maria Garcia",
    "email": "maria@example.com",
    "phone": "+1-555-0123",
    "languages": ["spanish"],
    "specialization": "medical",
    "hourly_rate": 45,
    "years_experience": 7,
    "credentials": {
      "certification": "CCHI",
      "expiry_date": "2027-06-15"
    },
    "bio": "Certified medical interpreter...",
    "average_rating": 4.8,
    "total_ratings": 42,
    "total_hours": 320,
    "total_earnings": 14400,
    "total_bookings": 85,
    "availability_status": "available",
    "created_at": "2026-01-15T10:00:00Z"
  }
}
```

### Update Interpreter Profile
```http
PUT /api/interpreters/:id
Authorization: Bearer <token>

{
  "bio": "Updated bio",
  "years_experience": 8,
  "credentials": {
    "certification": "CCHI",
    "expiry_date": "2027-06-15"
  },
  "hourly_rate": 45
}

Response:
{
  "success": true,
  "data": { updated Interpreter object }
}
```

### Set Availability
```http
PUT /api/interpreters/:id/availability
Authorization: Bearer <token>

{
  "availability_status": "available" | "unavailable" | "on-call",
  "availability_calendar": {
    "2026-04-01": {
      "09:00-17:00": true,
      "17:00-21:00": false
    },
    "2026-04-02": {
      "09:00-17:00": true
    }
  }
}

Response:
{
  "success": true,
  "data": { updated Interpreter object }
}
```

### Get Earnings
```http
GET /api/interpreters/:id/earnings?period=month
Authorization: Bearer <token>

Query Parameters:
- period (string) — "week", "month", "year", or specific date range
- start_date (YYYY-MM-DD)
- end_date (YYYY-MM-DD)

Response:
{
  "success": true,
  "data": {
    "total_earned": 2340.50,
    "completed_bookings": 52,
    "total_hours": 52,
    "pending_payout": 2340.50,
    "next_payout_date": "2026-04-05",
    "breakdown": [
      {
        "date": "2026-03-28",
        "amount": 45.00,
        "duration": 1,
        "booking_id": "uuid"
      },
      ...
    ]
  }
}
```

---

## Client Endpoints

### Get Client Profile
```http
GET /api/clients/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "full_name": "John Smith",
    "email": "john@hospital.com",
    "organization_name": "Denver General Hospital",
    "organization_type": "hospital",
    "address": "123 Medical Ave",
    "city": "Denver",
    "state": "CO",
    "zip_code": "80202",
    "total_bookings": 12,
    "total_spent": 900,
    "average_rating": 4.9,
    "payment_method_id": "pm_...",
    "created_at": "2026-02-01T10:00:00Z"
  }
}
```

### Update Client Profile
```http
PUT /api/clients/:id
Authorization: Bearer <token>

{
  "organization_name": "Updated Hospital",
  "contact_title": "Medical Director",
  "phone": "+1-555-0123"
}

Response:
{
  "success": true,
  "data": { updated Client object }
}
```

### Save Payment Method
```http
POST /api/clients/:id/payment-method
Authorization: Bearer <token>

{
  "payment_method_id": "pm_..." // From Stripe.js
}

Response:
{
  "success": true,
  "data": {
    "payment_method_id": "pm_...",
    "last4": "4242",
    "brand": "visa"
  }
}
```

---

## Booking Endpoints

### Create Booking
```http
POST /api/bookings
Authorization: Bearer <token>

{
  "scheduled_start": "2026-04-05T14:00:00Z",
  "scheduled_end": "2026-04-05T15:30:00Z",
  "location": "Denver General Hospital, Room 502",
  "location_type": "in-person" | "telehealth",
  "patient_name": "Rosa Martinez",
  "appointment_type": "consultation",
  "notes": "Patient speaks limited English, needs medical terminology support",
  "preferred_interpreter_id": "uuid" // optional
}

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "client_id": "uuid",
    "status": "pending",
    "scheduled_start": "2026-04-05T14:00:00Z",
    "scheduled_end": "2026-04-05T15:30:00Z",
    "location": "Denver General Hospital, Room 502",
    "client_rate": 75.00,
    "interpreter_rate": 45.00,
    "matches": [
      { interpreter objects },
      { interpreter objects },
      { interpreter objects }
    ]
  }
}
```

### List Bookings
```http
GET /api/bookings?status=confirmed&role=client
Authorization: Bearer <token>

Query Parameters:
- status (string) — "pending", "confirmed", "completed", "cancelled"
- role (string) — "client", "interpreter" (auto-detected from user)
- sort (string) — "scheduled_start", "created_at"
- limit (number) — 20 (default)
- offset (number) — 0 (pagination)

Response:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "client_id": "uuid",
      "interpreter_id": "uuid",
      "interpreter_name": "Maria Garcia",
      "scheduled_start": "2026-04-05T14:00:00Z",
      "scheduled_end": "2026-04-05T15:30:00Z",
      "location": "Denver General Hospital, Room 502",
      "status": "confirmed",
      "client_total": 75.00,
      "interpreter_total": 45.00,
      "average_rating": 4.8
    },
    ...
  ],
  "pagination": {
    "total": 42,
    "offset": 0,
    "limit": 20
  }
}
```

### Get Booking Details
```http
GET /api/bookings/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "client_id": "uuid",
    "client_name": "John Smith",
    "interpreter_id": "uuid",
    "interpreter_name": "Maria Garcia",
    "scheduled_start": "2026-04-05T14:00:00Z",
    "scheduled_end": "2026-04-05T15:30:00Z",
    "actual_duration_minutes": 90,
    "location": "Denver General Hospital, Room 502",
    "location_type": "in-person",
    "patient_name": "Rosa Martinez",
    "status": "completed",
    "client_total": 75.00,
    "interpreter_total": 45.00,
    "catena_fee": 30.00,
    "client_rating": 5,
    "client_review": "Great interpretation, very professional",
    "interpreter_rating": 4,
    "interpreter_review": "Client was prepared, efficient",
    "created_at": "2026-04-01T10:00:00Z",
    "completed_at": "2026-04-05T15:30:00Z"
  }
}
```

### Accept Job (Interpreter)
```http
POST /api/bookings/:id/accept
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "confirmed",
    "interpreter_id": "uuid",
    "notification_sent_to_client": true
  }
}
```

### Decline Job (Interpreter)
```http
POST /api/bookings/:id/decline
Authorization: Bearer <token>

{
  "reason": "Not available at this time"
}

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "pending",
    "message": "Offered to next available interpreter"
  }
}
```

### Complete Booking
```http
POST /api/bookings/:id/complete
Authorization: Bearer <token>

{
  "actual_duration_minutes": 90,
  "notes": "Appointment completed successfully"
}

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "completed",
    "completed_at": "2026-04-05T15:30:00Z",
    "payment_intent_created": true
  }
}
```

### Rate Booking
```http
POST /api/bookings/:id/rate
Authorization: Bearer <token>

{
  "score": 5,
  "review": "Excellent interpretation, very professional"
}

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "rating": 5,
    "review": "Excellent interpretation...",
    "interpreter_average_rating": 4.8
  }
}
```

---

## Payment Endpoints

### Create Payment Intent
```http
POST /api/payments/intent
Authorization: Bearer <token>

{
  "booking_id": "uuid",
  "amount": 75.00
}

Response:
{
  "success": true,
  "data": {
    "client_secret": "pi_xxx_secret_xxx",
    "amount": 7500, // cents
    "currency": "usd"
  }
}
```

### Confirm Payment
```http
POST /api/payments/confirm
Authorization: Bearer <token>

{
  "payment_intent_id": "pi_xxx",
  "booking_id": "uuid"
}

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "succeeded",
    "amount": 75.00,
    "booking_id": "uuid",
    "receipt_url": "https://receipts.stripe.com/..."
  }
}
```

### Get Payment History
```http
GET /api/payments?limit=20&offset=0
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "booking_id": "uuid",
      "amount": 75.00,
      "status": "succeeded",
      "created_at": "2026-03-28T14:00:00Z",
      "receipt_url": "https://receipts.stripe.com/..."
    },
    ...
  ]
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable error message"
}
```

### Common Error Codes
- `UNAUTHORIZED` — Not logged in
- `FORBIDDEN` — Not allowed to access this resource
- `NOT_FOUND` — Resource not found
- `VALIDATION_ERROR` — Invalid request data
- `CONFLICT` — Email already exists, etc.
- `STRIPE_ERROR` — Payment processing failed
- `INTERNAL_ERROR` — Server error

---

## Data Types

### User
```typescript
{
  id: string (UUID)
  email: string
  full_name: string
  phone?: string
  role: 'client' | 'interpreter' | 'admin'
  avatar_url?: string
  bio?: string
  is_active: boolean
  is_verified: boolean
  created_at: ISO 8601 timestamp
  updated_at: ISO 8601 timestamp
}
```

### Interpreter
```typescript
{
  id: string (UUID)
  user_id: string
  languages: string[]
  specialization: string
  hourly_rate: number
  years_experience: number
  credentials?: Record<string, any>
  bio?: string
  average_rating: number (0-5)
  total_ratings: number
  total_hours: number
  total_earnings: number
  availability_status: 'available' | 'unavailable' | 'on-call'
  created_at: ISO 8601 timestamp
}
```

### Booking
```typescript
{
  id: string (UUID)
  client_id: string
  interpreter_id?: string
  scheduled_start: ISO 8601 timestamp
  scheduled_end: ISO 8601 timestamp
  actual_duration_minutes?: number
  location: string
  location_type: 'in-person' | 'telehealth'
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  client_rate: number
  interpreter_rate: number
  client_total?: number
  interpreter_total?: number
  catena_fee?: number
  client_rating?: number (1-5)
  interpreter_rating?: number (1-5)
  created_at: ISO 8601 timestamp
}
```

---

## Rate Limiting

- **Unauthenticated:** 10 requests/minute per IP
- **Authenticated:** 100 requests/minute per user
- **Stripe API:** 100 requests/second (Stripe limit)

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1680120000
```

---

## Webhooks

### Stripe Events

**Endpoint:** `POST /api/webhooks/stripe`

Handles:
- `payment_intent.succeeded` — Payment processed
- `charge.failed` — Payment failed
- `payout.paid` — Interpreter payout completed
- `payout.failed` — Payout failed

---

_API Reference v1.0 | Updated: 2026-03-28_
