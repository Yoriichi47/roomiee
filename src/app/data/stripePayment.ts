"use server";

import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

export async function createStripeSession({
  roomId,
  roomName,
  startDate,
  endDate,
  daysOfStay,
  amount,
  roomDescription,
}: {
  roomId: string;
  roomName: string;
  startDate: string;
  endDate: string;
  daysOfStay: number;
  amount: number;
  roomDescription: string;
}) {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `http://localhost:3000/bookings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/checkout?roomId=${roomId}`,
      customer_email: user.emailAddresses[0]?.emailAddress,
      client_reference_id: roomId,
      metadata: {
        userId: user.id,
        roomId: roomId,
        checkInDate: startDate,
        checkOutDate: endDate,
        daysOfStay: daysOfStay.toString(),
      },
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amount * 100, 
            product_data: {
              name: roomName,
              description: roomDescription,
            },
          },
          quantity: 1,
        },
      ],
    });

    return { success: true, sessionId: session.id, url: session.url };
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return { success: false, error: "Failed to create payment session" };
  }
}