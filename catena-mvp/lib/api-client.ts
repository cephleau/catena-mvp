// API Client - Placeholder for Phase 3+ implementation
// Real Supabase integration happens when backend is ready

export async function createBooking(bookingData: any) {
  return {
    success: true,
    booking: {
      id: 'booking_' + Math.random().toString(36).slice(2, 9),
      ...bookingData,
      status: 'confirmed',
      cost: 75,
    },
    message: 'Booking created (placeholder)',
  }
}

export async function findMatchingInterpreters(language: string) {
  return {
    interpreters: [
      {
        id: 'interp_1',
        name: 'Maria Garcia',
        languages: ['spanish'],
        rating: 4.9,
        hourlyRate: 45,
      },
      {
        id: 'interp_2',
        name: 'Juan Martinez',
        languages: ['spanish'],
        rating: 4.8,
        hourlyRate: 45,
      },
    ],
    message: 'Matching interpreters (placeholder)',
  }
}

export async function getInterpreterJobs(interpreterId: string) {
  return {
    jobs: [],
    message: 'Jobs loaded (placeholder)',
  }
}

export async function acceptJob(jobId: string) {
  return {
    success: true,
    message: 'Job accepted (placeholder)',
  }
}

async function getUpcomingJobs(interpreterId: string) {
  return []
}

async function getCompletedJobs(interpreterId: string) {
  return []
}

async function getEarningsSummary(interpreterId: string) {
  return {
    totalEarnings: 0,
    hoursWorked: 0,
    jobsCompleted: 0,
  }
}

export const interpreterAPI = {
  getJobs: getInterpreterJobs,
  acceptJob,
  findMatching: findMatchingInterpreters,
  getUpcomingJobs,
  getCompletedJobs,
  getEarningsSummary,
}
