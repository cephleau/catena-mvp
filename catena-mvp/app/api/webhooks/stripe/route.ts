import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // TODO: Stripe webhook temporarily disabled — requires real Stripe secret key
  // Implementation placeholder for Phase 4
  
  return NextResponse.json(
    { success: true, message: 'Stripe webhook endpoint ready (placeholder)' },
    { status: 200 }
  )
}
