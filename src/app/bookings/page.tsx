import React from "react";
import { getUserBookedRooms } from "../data/getUserBookedRooms";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";

const page = async () => {
  const data = await getUserBookedRooms();

  const roomAddress = `${data?.bookings[0]?.roomStreet}, ${data?.bookings[0]?.roomCity}, ${data?.bookings[0]?.roomState}, ${data?.bookings[0]?.roomCountry}, ${data?.bookings[0]?.roomZipCode}`;

  if (!data?.bookings || data.bookings.length === 0) {
    return (
      <div className="flex justify-center items-start min-h-screen">
        <Card className="mt-10 w-full max-w-4xl bg-zinc-800 border-zinc-800 text-zinc-100">
          <CardHeader>All Bookings</CardHeader>
          <CardContent>
            <p>You have no booked rooms.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-start min-h-screen">
        <Card className="mt-10 w-full max-w-4xl bg-zinc-800 border-zinc-800 text-zinc-100">
          <CardHeader className="text-center text-4xl underline underline-offset-2 font-bold">
            All Bookings
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {data.bookings.map((booking, index) => {
              return (
                <Card
                  key={booking.roomId + index}
                  className="bg-zinc-700 border-zinc-700"
                >
                  <CardHeader className="font-semibold text-xl inline-block">
                    {index + 1}.
                    <Link
                      className="hover:text-blue-300 pl-2 hover:underline underline-offset-2 transition-all"
                      href={`rooms?roomId=${data?.bookings[index].roomId}`}
                    >
                      {booking.roomName}
                    </Link>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 ">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Image
                          className="w-28 object-cover rounded-lg"
                          src={booking.roomImages?.[0] || "/placeholder.png"}
                          alt={booking.roomName || "Room"}
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm">
                          <span className="font-semibold">Address:</span>{" "}
                          {roomAddress}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Price Paid:</span> $
                          {booking.amountPaid}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Days of Stay:</span>{" "}
                          {booking.daysOfStay}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Button className="bg-zinc-600 hover:bg-zinc-800 transition-all" ><Link href={`/bookings/details?roomId=${booking.roomId}`}>View Details</Link></Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default page;
