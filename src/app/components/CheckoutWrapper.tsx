"use client";

import { useState } from "react";
import { GuestInfo } from "./GuestInfo";
import { CheckoutSection } from "./CheckoutSection";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";

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
  Street: string;
  City: string;
  State: string;
  ZipCode: string;
  guestCapacity: number;
  images: string[];
}

export function CheckoutWrapper({ room }: { room: RoomData }) {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  return (
    <Card className="p-6 flex flex-col rounded-2xl bg-zinc-800 m-auto gap-6 border-zinc-800">
      <div className="flex gap-6">
        <div className="RoomDetails w-1/2 text-zinc-200">
          <Card className="flex flex-col p-4 gap-4 min-h-full bg-zinc-700 border-zinc-700">
            <CardTitle className="text-center text-2xl underline underline-offset-2">
              Room Details
            </CardTitle>
            <span>
              <p className="font-semibold">{room.name}</p>
              <p>
                {room.Street}, {room.City}, {room.State}, {room.ZipCode}
              </p>
            </span>
            <span className="w-full">
              <Image
                className="rounded-lg m-auto"
                src={room.images[0]}
                alt="Room Image"
                width={300}
                height={200}
              />
            </span>
            <span>
              <span className="font-semibold">${room.price}</span>/night
            </span>
          </Card>
        </div>

        <div className="CenterSection">
          <Card className="flex flex-col p-4 gap-4 min-h-full bg-zinc-700 border-zinc-700 w-full">
            <CardTitle className="text-center text-2xl underline underline-offset-2">
              Guest Details
            </CardTitle>
            <CardContent>
              <GuestInfo
                roomId={room.roomId}
                roomName={room.name}
                roomDescription={room.description}
                totalPrice={room.price}
                maxGuests={room.guestCapacity}
                onBookingDataChange={setBookingData}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <div className="CheckoutSection">
          <Card className="flex flex-col p-4 gap-4 bg-zinc-700 border-zinc-700 w-full">
            <CardTitle className="text-center text-2xl underline underline-offset-2">
              Checkout
            </CardTitle>
            <CardContent>
              <CheckoutSection
                room={room}
                bookingData={bookingData}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Card>
  );
}