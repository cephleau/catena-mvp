// User types
export type UserRole = 'client' | 'interpreter' | 'admin'

export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  role: UserRole
  avatar_url?: string
  bio?: string
  stripe_customer_id?: string
  stripe_account_id?: string
  is_active: boolean
  is_verified: boolean
  created_at: string
  updated_at: string
}

// Interpreter types
export interface Interpreter {
  id: string
  user_id: string
  languages: string[]
  specialization: string
  hourly_rate: number
  years_experience: number
  credentials?: Record<string, unknown>
  bio?: string
  average_rating: number
  total_ratings: number
  total_hours: number
  total_earnings: number
  total_bookings: number
  availability_status: 'available' | 'unavailable' | 'on-call'
  availability_calendar?: Record<string, unknown>
  bank_account_last4?: string
  created_at: string
  updated_at: string
  last_active?: string
  user?: User
}

// Client types
export interface Client {
  id: string
  user_id: string
  organization_name?: string
  organization_type?: string
  contact_title?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  payment_method_id?: string
  total_bookings: number
  total_spent: number
  average_rating: number
  created_at: string
  updated_at: string
  user?: User
}

// Booking types
export type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'

export interface Booking {
  id: string
  client_id: string
  interpreter_id?: string
  scheduled_start: string
  scheduled_end: string
  actual_duration_minutes?: number
  location: string
  location_type: 'in-person' | 'telehealth'
  patient_name?: string
  appointment_type?: string
  notes?: string
  client_rate: number
  interpreter_rate: number
  client_total?: number
  interpreter_total?: number
  catena_fee?: number
  status: BookingStatus
  client_rating?: number
  client_review?: string
  interpreter_rating?: number
  interpreter_review?: string
  created_at: string
  updated_at: string
  completed_at?: string
  cancelled_at?: string
  client?: Client
  interpreter?: Interpreter
}

// Payment types
export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded'

export interface Payment {
  id: string
  booking_id: string
  client_id: string
  user_id: string
  amount: number
  currency: string
  stripe_charge_id?: string
  stripe_payment_intent_id?: string
  status: PaymentStatus
  error_message?: string
  receipt_url?: string
  created_at: string
  updated_at: string
  paid_at?: string
  booking?: Booking
}

// Payout types
export type PayoutStatus = 'pending' | 'processing' | 'paid' | 'failed'

export interface Payout {
  id: string
  interpreter_id: string
  user_id: string
  amount: number
  currency: string
  stripe_payout_id?: string
  period_start: string
  period_end: string
  status: PayoutStatus
  error_message?: string
  created_at: string
  updated_at: string
  paid_at?: string
}

// Rating types
export interface Rating {
  id: string
  booking_id: string
  rater_id: string
  ratee_id: string
  score: number
  review?: string
  created_at: string
  updated_at: string
}

// Notification types
export type NotificationType =
  | 'booking_request'
  | 'booking_accepted'
  | 'booking_declined'
  | 'payment_processed'
  | 'payout_sent'
  | 'rating_received'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message?: string
  related_booking_id?: string
  is_read: boolean
  created_at: string
  read_at?: string
}

// API Request/Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AuthRequest {
  email: string
  password: string
  full_name?: string
  role?: UserRole
}

export interface AuthResponse {
  user: User
  session: {
    access_token: string
    refresh_token: string
    expires_in: number
  }
}

export interface CreateBookingRequest {
  scheduled_start: string
  scheduled_end: string
  location: string
  location_type: 'in-person' | 'telehealth'
  patient_name?: string
  appointment_type?: string
  notes?: string
  preferred_interpreter_id?: string
}

export interface UpdateAvailabilityRequest {
  availability_status: 'available' | 'unavailable' | 'on-call'
  availability_calendar?: Record<string, unknown>
}

// View types (for dashboards)
export interface InterpreterAvailability extends Interpreter {
  completed_bookings: number
}

export interface ClientBookingHistory extends Booking {
  interpreter_name?: string
  interpreter_rating?: number
}

export interface InterpreterEarningsSummary {
  id: string
  user_id: string
  full_name: string
  completed_bookings: number
  total_earned: number
  total_minutes: number
  total_hours: number
}
