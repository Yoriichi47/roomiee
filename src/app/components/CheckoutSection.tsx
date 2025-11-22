"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard } from "lucide-react";
import { createStripeSession } from "@/app/data/stripePayment";
import { format } from "date-fns";

interface BookingData {
  startDate: string;
  endDate: string;
  daysOfStay: number;
  guests: number;
  totalAmount: number;
}

interface RoomData {
  roomId: string;
  name: string;
  description: string;
  price: number;
}

export function CheckoutSection({
  room,
  bookingData,
}: {
  room: RoomData;
  bookingData: BookingData | null;
}) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!bookingData) {
      alert("Please select dates and number of guests first!");
      return;
    }

    setLoading(true);

    try {
      const result = await createStripeSession({
        roomId: room.roomId,
        roomName: room.name,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        daysOfStay: bookingData.daysOfStay,
        amount: bookingData.totalAmount,
        roomDescription: room.description,
      });

      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        alert(result.error || "Payment failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="text-center text-zinc-400 py-8">
        <CreditCard className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Please select your dates and number of guests to proceed with checkout.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-zinc-800 p-4 rounded-lg space-y-2">
        <h3 className="font-semibold text-lg mb-3">Booking Summary</h3>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Check-in:</span>
          <span>{format(new Date(bookingData.startDate), "MMM dd, yyyy")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Check-out:</span>
          <span>{format(new Date(bookingData.endDate), "MMM dd, yyyy")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Nights:</span>
          <span>{bookingData.daysOfStay}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Guests:</span>
          <span>{bookingData.guests}</span>
        </div>
        <div className="border-t border-zinc-700 my-2 pt-2"></div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${bookingData.totalAmount}</span>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Proceed to Payment
          </>
        )}
      </Button>

      <p className="text-xs text-center text-zinc-400">
        You will be redirected to Stripe for secure payment processing
      </p>
    </div>
  );
}