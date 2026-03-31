'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'
import type { Booking } from '@/types'

interface BookingFormProps {
  clientId: string
  onSuccess: (booking: Booking) => void
  isLoading?: boolean
}

export function BookingForm({ clientId, onSuccess, isLoading: parentLoading }: BookingFormProps) {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'details' | 'confirmation' | 'payment'>('details')
  const [formData, setFormData] = useState({
    patientName: '',
    appointmentType: 'consultation',
    location: '',
    locationType: 'telehealth' as const,
    scheduledDate: '',
    scheduledTime: '',
    durationHours: 1,
    preferredLanguage: 'spanish',
    notes: '',
  })
  const [booking, setBooking] = useState<Booking | null>(null)

  // Calculate cost
  const hourlyRate = 75
  const cost = formData.durationHours * hourlyRate

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'durationHours' ? parseFloat(value) : value,
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.patientName.trim()) {
      toast.error('Patient name is required')
      return false
    }
    if (!formData.scheduledDate) {
      toast.error('Date is required')
      return false
    }
    if (!formData.scheduledTime) {
      toast.error('Time is required')
      return false
    }
    if (!formData.location.trim() && (formData.locationType as string) === 'in-person') {
      toast.error('Location is required for in-person appointments')
      return false
    }

    // Check that booking is in the future
    const now = new Date()
    const bookingTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`)
    if (bookingTime <= now) {
      toast.error('Booking time must be in the future')
      return false
    }

    return true
  }

  const handleCreateBooking = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const scheduledStart = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`)
      const scheduledEnd = new Date(
        scheduledStart.getTime() + formData.durationHours * 60 * 60 * 1000
      )

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          scheduledStart: scheduledStart.toISOString(),
          scheduledEnd: scheduledEnd.toISOString(),
          location: formData.location,
          locationType: formData.locationType,
          patientName: formData.patientName,
          appointmentType: formData.appointmentType,
          notes: formData.notes,
          preferredLanguage: formData.preferredLanguage,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create booking')
      }

      const data = await response.json()
      const newBooking = data.data as Booking
      setBooking(newBooking)
      setStep('confirmation')
      toast.success('Booking created! Proceeding to payment...')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create booking'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    if (!booking) return

    setLoading(true)
    try {
      // Create Stripe payment intent
      const response = await fetch('/api/payments/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          amount: cost,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }

      const data = await response.json()
      // In a real app, this would open Stripe payment modal
      // For now, we'll just complete the flow
      setStep('payment')
      toast.success('Payment processed! Interpreter will be assigned shortly.')
      onSuccess(booking)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Payment failed'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const isLoading = loading || parentLoading

  // Step 1: Details Form
  if (step === 'details') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#1A3A52]">Request Interpreter</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1A3A52] mb-2">
              Patient Name *
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              placeholder="Full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4DB8A8]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A3A52] mb-2">
              Appointment Type
            </label>
            <select
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4DB8A8]"
            >
              <option value="consultation">Consultation</option>
              <option value="surgery">Surgery</option>
              <option value="procedure">Procedure</option>
              <option value="follow-up">Follow-up</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A3A52] mb-2">
              Service Type *
            </label>
            <select
              name="locationType"
              value={formData.locationType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4DB8A8]"
            >
              <option value="telehealth">Telehealth (Video Call)</option>
              <option value="in-person">In-Person</option>
            </select>
          </div>

          {(formData.locationType as string) === 'in-person' && (
            <div>
              <label className="block text-sm font-medium text-[#1A3A52] mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Address or facility name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4DB8A8]"
                required={(formData.locationType as string) === 'in-person'}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#1A3A52] mb-2">Date *</label>
            <input
              type="date"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4DB8A8]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A3A52] mb-2">Time *</label>
            <input
              type="time"
              name="scheduledTime"
              value={formData.scheduledTime}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4DB8A8]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A3A52] mb-2">
              Duration (Hours)
            </label>
            <select
              name="durationHours"
              value={formData.durationHours}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4DB8A8]"
            >
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
              <option value="4">4 hours</option>
              <option value="8">Full day (8 hours)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A3A52] mb-2">
              Preferred Language
            </label>
            <select
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4DB8A8]"
            >
              <option value="spanish">Spanish</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A3A52] mb-2">Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Any special instructions or requirements?"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4DB8A8]"
          />
        </div>

        {/* Cost Summary */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Hourly rate:</span>
            <span className="font-medium text-[#1A3A52]">{formatCurrency(hourlyRate)}/hr</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium text-[#1A3A52]">{formData.durationHours} hours</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between">
            <span className="font-semibold text-[#1A3A52]">Total:</span>
            <span className="font-bold text-[#4DB8A8] text-lg">{formatCurrency(cost)}</span>
          </div>
        </div>

        <Button
          onClick={handleCreateBooking}
          disabled={isLoading}
          className="w-full bg-[#4DB8A8] hover:bg-[#6ECCC0] text-white font-semibold py-3 rounded-lg"
        >
          {isLoading ? 'Creating booking...' : 'Continue to Payment'}
        </Button>
      </div>
    )
  }

  // Step 2: Confirmation
  if (step === 'confirmation' && booking) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-5xl font-bold text-[#4DB8A8]">✓</div>
          <h2 className="text-2xl font-bold text-[#1A3A52]">Booking Created!</h2>
          <p className="text-gray-600">Your interpreter booking has been confirmed</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-[#1A3A52]">Booking Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking ID:</span>
              <span className="font-mono font-medium">{booking.id.slice(0, 8)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Patient:</span>
              <span className="font-medium">{booking.patient_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date/Time:</span>
              <span className="font-medium">
                {new Date(booking.scheduled_start).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium capitalize">{booking.location_type}</span>
            </div>
            <div className="border-t border-blue-200 pt-2 flex justify-between font-semibold">
              <span>Total:</span>
              <span className="text-[#4DB8A8]">{formatCurrency(booking.client_total || 0)}</span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
          <p className="font-medium text-yellow-900 mb-2">Next Steps</p>
          <ul className="text-yellow-800 space-y-1 list-disc list-inside">
            <li>Complete payment to confirm booking</li>
            <li>Interpreter will be assigned and notified</li>
            <li>You'll receive confirmation email with details</li>
          </ul>
        </div>

        <Button
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full bg-[#4DB8A8] hover:bg-[#6ECCC0] text-white font-semibold py-3 rounded-lg"
        >
          {isLoading ? 'Processing...' : `Pay ${formatCurrency(cost)}`}
        </Button>

        <Button
          onClick={() => {
            setStep('details')
            setFormData({
              patientName: '',
              appointmentType: 'consultation',
              location: '',
              locationType: 'telehealth',
              scheduledDate: '',
              scheduledTime: '',
              durationHours: 1,
              preferredLanguage: 'spanish',
              notes: '',
            })
            setBooking(null)
          }}
          className="w-full bg-white border border-gray-300 text-[#1A3A52] font-semibold py-3 rounded-lg hover:bg-gray-50"
        >
          Create Another Booking
        </Button>
      </div>
    )
  }

  // Step 3: Payment Success
  if (step === 'payment' && booking) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-5xl font-bold text-[#4DB8A8]">✓</div>
          <h2 className="text-2xl font-bold text-[#1A3A52]">Payment Confirmed!</h2>
          <p className="text-gray-600">Interpreter will be assigned shortly</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-[#1A3A52]">What Happens Next</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="font-bold text-[#4DB8A8]">1</span>
              <span>System matches available interpreters</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#4DB8A8]">2</span>
              <span>Interpreter confirms availability</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#4DB8A8]">3</span>
              <span>You receive confirmation with interpreter details</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#4DB8A8]">4</span>
              <span>Join video call or meet at location</span>
            </li>
          </ol>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-sm">
          <p className="font-medium text-[#1A3A52] mb-2">Booking Confirmation</p>
          <p className="text-gray-600">
            A confirmation email has been sent to your registered email address. You can view and
            manage your bookings in your dashboard.
          </p>
        </div>

        <div className="space-y-2">
          <Button className="w-full bg-[#4DB8A8] hover:bg-[#6ECCC0] text-white font-semibold py-3 rounded-lg">
            View My Bookings
          </Button>
          <Button className="w-full bg-white border border-gray-300 text-[#1A3A52] font-semibold py-3 rounded-lg hover:bg-gray-50">
            Return Home
          </Button>
        </div>
      </div>
    )
  }

  return null
}
