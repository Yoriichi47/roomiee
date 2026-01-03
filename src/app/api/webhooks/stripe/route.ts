import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { bookings } from "@/db/schema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      console.error("❌ No stripe-signature header found");
      return NextResponse.json(
        { error: "No signature header" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("❌ Webhook signature verification failed:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    console.log("✅ Webhook received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("💳 Payment completed for session:", session.id);

      const userId = session.metadata?.userId;
      const roomId = session.metadata?.roomId;
      const checkInDate = session.metadata?.checkInDate;
      const checkOutDate = session.metadata?.checkOutDate;
      const daysOfStay = parseInt(session.metadata?.daysOfStay || "0");

      console.log("📦 Metadata:", {
        userId,
        roomId,
        checkInDate,
        checkOutDate,
        daysOfStay,
      });

      if (!userId || !roomId || !checkInDate || !checkOutDate) {
        console.error("❌ Missing required metadata");
        return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
      }

      try {
        const [newBooking] = await db
          .insert(bookings)
          .values({
            userId: userId,
            roomId: roomId,
            startDate: new Date(checkInDate),
            endDate: new Date(checkOutDate),
            amountPaid: (session.amount_total || 0) / 100,
            daysOfStay: daysOfStay,
            paymentInfo: session.id,
          })
          .returning();

        console.log("✅ Booking saved successfully:", newBooking.bookingId);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("❌ Error saving booking:", errorMessage);
        return NextResponse.json(
          { error: "Failed to save booking" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Webhook error:", errorMessage);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}