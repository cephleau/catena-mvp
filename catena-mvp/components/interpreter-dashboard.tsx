'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate, formatTime, calculateDuration } from '@/lib/utils'
// import { interpreterAPI } from '@/lib/api-client' // TODO: Phase 3
import toast from 'react-hot-toast'
import type { Booking, Interpreter } from '@/types'

interface InterpreterDashboardProps {
  interpreter: Interpreter
}

type TabType = 'upcoming' | 'completed' | 'earnings'

export function InterpreterDashboard({ interpreter }: InterpreterDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming')
  const [upcomingJobs, setUpcomingJobs] = useState<Booking[]>([])
  const [completedJobs, setCompletedJobs] = useState<Booking[]>([])
  const [earnings, setEarnings] = useState({
    totalEarned: 0,
    pendingEarnings: 0,
    completedBookings: 0,
    totalHours: 0,
  })
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Booking | null>(null)
  const [showJobModal, setShowJobModal] = useState(false)
  const [actingOnJob, setActingOnJob] = useState<string | null>(null)

  // Load dashboard data
  useEffect(() => {
    // TODO: Phase 3 — Connect to real API when backend is ready
    // For now, show placeholder data
    setLoading(false)
    setUpcomingJobs([])
    setCompletedJobs([])
    setEarnings({
      totalEarned: 0,
      pendingEarnings: 0,
      completedBookings: 0,
      totalHours: 0,
    })
  }, [interpreter.id])

  // TODO: Phase 3 — Connect job actions to real API
  const handleAcceptJob = async (job: Booking) => {
    toast.success('Job action ready (Phase 3 integration)')
    setShowJobModal(false)
  }

  const handleDeclineJob = async (job: Booking) => {
    toast.success('Job action ready (Phase 3 integration)')
    setShowJobModal(false)
  }

  const handleCompleteJob = async (job: Booking) => {
    toast.success('Job action ready (Phase 3 integration)')
    setShowJobModal(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#1A3A52]">Welcome, {interpreter.user?.full_name}!</h1>
        <p className="text-gray-600">Your interpretation dashboard</p>
      </div>

      {/* Earnings Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Earned</p>
          <p className="text-2xl font-bold text-[#4DB8A8]">{formatCurrency(earnings.totalEarned)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{formatCurrency(earnings.pendingEarnings)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Completed Jobs</p>
          <p className="text-2xl font-bold text-[#1A3A52]">{earnings.completedBookings}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Hours</p>
          <p className="text-2xl font-bold text-[#1A3A52]">{earnings.totalHours}h</p>
        </div>
      </div>

      {/* Rating Badge */}
      {interpreter.average_rating > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-[#1A3A52]">Your Rating</p>
            <p className="text-sm text-gray-600">{interpreter.total_ratings} ratings</p>
          </div>
          <div className="text-3xl font-bold text-[#4DB8A8]">
            ⭐ {interpreter.average_rating.toFixed(1)}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 flex gap-4">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'upcoming'
              ? 'text-[#4DB8A8] border-b-2 border-[#4DB8A8]'
              : 'text-gray-600 hover:text-[#1A3A52]'
          }`}
        >
          Upcoming Jobs ({upcomingJobs.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'completed'
              ? 'text-[#4DB8A8] border-b-2 border-[#4DB8A8]'
              : 'text-gray-600 hover:text-[#1A3A52]'
          }`}
        >
          Completed Jobs ({completedJobs.length})
        </button>
        <button
          onClick={() => setActiveTab('earnings')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'earnings'
              ? 'text-[#4DB8A8] border-b-2 border-[#4DB8A8]'
              : 'text-gray-600 hover:text-[#1A3A52]'
          }`}
        >
          Earnings
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {/* Upcoming Jobs */}
        {activeTab === 'upcoming' && (
          <div className="space-y-3">
            {upcomingJobs.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-2">No upcoming jobs</p>
                <p className="text-sm text-gray-500">Check back soon or update your availability</p>
              </div>
            ) : (
              upcomingJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedJob(job)
                    setShowJobModal(true)
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-[#1A3A52]">{job.client?.user?.full_name}</h3>
                      <p className="text-sm text-gray-600">{job.appointment_type}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Date & Time</p>
                      <p className="font-medium text-[#1A3A52]">
                        {formatDate(job.scheduled_start)} at {formatTime(job.scheduled_start)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-medium text-[#1A3A52] capitalize">{job.location_type}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-[#4DB8A8] font-bold">{formatCurrency(job.interpreter_total || 0)}</p>
                    <p className="text-sm text-gray-600">
                      {calculateDuration(job.scheduled_start, job.scheduled_end)} min
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Completed Jobs */}
        {activeTab === 'completed' && (
          <div className="space-y-3">
            {completedJobs.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-600">No completed jobs yet</p>
              </div>
            ) : (
              completedJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-[#1A3A52]">{job.client?.user?.full_name}</h3>
                      <p className="text-sm text-gray-600">{job.appointment_type}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Date</p>
                      <p className="font-medium text-[#1A3A52]">{formatDate(job.completed_at || job.scheduled_start)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Earned</p>
                      <p className="font-bold text-[#4DB8A8]">{formatCurrency(job.interpreter_total || 0)}</p>
                    </div>
                  </div>

                  {job.interpreter_rating && (
                    <div className="bg-blue-50 rounded p-2 text-sm">
                      <p className="font-medium text-[#1A3A52]">⭐ {job.interpreter_rating}/5</p>
                      {job.interpreter_review && <p className="text-gray-600 mt-1">{job.interpreter_review}</p>}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Earnings */}
        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-2">Total Earned (All Time)</p>
                <p className="text-3xl font-bold text-green-700">{formatCurrency(earnings.totalEarned)}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <p className="text-sm text-gray-600 mb-2">Pending Payout</p>
                <p className="text-3xl font-bold text-yellow-700">{formatCurrency(earnings.pendingEarnings)}</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-[#1A3A52] mb-3">Earning Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hourly Rate</span>
                  <span className="font-medium">{formatCurrency(45)}/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed Bookings</span>
                  <span className="font-medium">{earnings.completedBookings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Hours</span>
                  <span className="font-medium">{earnings.totalHours} hours</span>
                </div>
                <div className="border-t border-blue-200 pt-2 flex justify-between font-bold">
                  <span>Lifetime Earnings</span>
                  <span className="text-[#4DB8A8]">{formatCurrency(earnings.totalEarned)}</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="font-semibold text-[#1A3A52] mb-2">Next Payout</p>
              <p className="text-sm text-gray-600">
                Payouts are processed weekly. Your next payout is scheduled for{' '}
                <strong>this Friday</strong>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Job Modal */}
      {showJobModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <h2 className="text-2xl font-bold text-[#1A3A52]">{selectedJob.client?.user?.full_name}</h2>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Appointment Type</p>
                <p className="font-medium text-[#1A3A52] capitalize">{selectedJob.appointment_type}</p>
              </div>
              <div>
                <p className="text-gray-600">Date & Time</p>
                <p className="font-medium text-[#1A3A52]">
                  {formatDate(selectedJob.scheduled_start)} at {formatTime(selectedJob.scheduled_start)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="font-medium text-[#1A3A52]">
                  {calculateDuration(selectedJob.scheduled_start, selectedJob.scheduled_end)} minutes
                </p>
              </div>
              <div>
                <p className="text-gray-600">Location</p>
                <p className="font-medium text-[#1A3A52] capitalize">
                  {selectedJob.location_type} {selectedJob.location && `- ${selectedJob.location}`}
                </p>
              </div>
              <div className="bg-yellow-50 rounded p-2">
                <p className="text-gray-600">Compensation</p>
                <p className="font-bold text-[#4DB8A8] text-lg">{formatCurrency(selectedJob.interpreter_total || 0)}</p>
              </div>
            </div>

            {selectedJob.notes && (
              <div className="bg-gray-50 rounded p-3 text-sm">
                <p className="text-gray-600 mb-1">Notes</p>
                <p className="text-gray-700">{selectedJob.notes}</p>
              </div>
            )}

            <div className="space-y-2">
              {selectedJob.status === 'pending' && (
                <>
                  <Button
                    onClick={() => handleAcceptJob(selectedJob)}
                    disabled={actingOnJob === selectedJob.id}
                    className="w-full bg-[#4DB8A8] hover:bg-[#6ECCC0] text-white font-semibold py-2 rounded-lg"
                  >
                    {actingOnJob === selectedJob.id ? 'Accepting...' : 'Accept Job'}
                  </Button>
                  <Button
                    onClick={() => handleDeclineJob(selectedJob)}
                    disabled={actingOnJob === selectedJob.id}
                    className="w-full bg-white border border-gray-300 text-[#1A3A52] font-semibold py-2 rounded-lg hover:bg-gray-50"
                  >
                    {actingOnJob === selectedJob.id ? 'Declining...' : 'Decline'}
                  </Button>
                </>
              )}

              {selectedJob.status === 'confirmed' && (
                <Button
                  onClick={() => handleCompleteJob(selectedJob)}
                  disabled={actingOnJob === selectedJob.id}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
                >
                  {actingOnJob === selectedJob.id ? 'Marking complete...' : 'Mark as Completed'}
                </Button>
              )}

              <Button
                onClick={() => setShowJobModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
