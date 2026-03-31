import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { bookingId, amount } = await request.json()

    if (!bookingId || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents
      currency: 'usd',
      metadata: {
        bookingId,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          status: paymentIntent.status,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Payment intent creation error:', error)
    const message = error instanceof Error ? error.message : 'Failed to create payment intent'

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
