import { getAdminBookings } from "@/app/data/getUserBookedRooms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { EyeIcon, ListIcon, TrashIcon } from "lucide-react";
import { format } from "date-fns";
import DeleteBookingButtonComponent from "./DeleteBookingButtonComponent";

const page = async () => {
  const data = await getAdminBookings();
  console.log("Admin Bookings Data:", data);

  if(!data || data?.bookings?.length === 0){
    return(
      <Card className="bg-zinc-700 rounded-l-none w-full border-zinc-700">
      <CardHeader className="text-center text-2xl underline underline-offset-1 font-semibold">
        Bookings
      </CardHeader>
      <CardContent className="flex justify-center items-center h-32 text-zinc-400">
        No bookings found.
      </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-zinc-700 rounded-l-none w-full border-zinc-700">
      <CardHeader className="text-center text-2xl underline underline-offset-1 font-semibold">
        Bookings
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {data?.bookings?.map((booking, index) => {
          return (
            <Card
              key={booking.roomId + index}
              className="bg-zinc-900 border-zinc-900"
            >
              <CardHeader className="font-semibold text-xl inline-block">
                {index + 1}. <span className="underline underline-offset-1">{booking.bookingId}</span>
              </CardHeader>
              <CardContent className="flex justify-between">
                
                <div className="text-sm text-zinc-400">
                  <div>
                    <span>Check-in Date: {format(new Date(booking.startDate), "PPP")} </span>
                  </div>
                  <div>
                    <span>Check-out Date: {format(new Date(booking.endDate), "PPP")} </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="bg-zinc-600 hover:bg-zinc-700 transition-all">
                    <Link href={`/admin/bookings/details?roomId=${booking.roomId}`}>
                      <span className="flex gap-2 items-center"><EyeIcon /> Details</span>
                    </Link>
                  </Button>
                  <Button className="bg-zinc-600 hover:bg-zinc-700 transition-all">
                    <Link href={`/admin/bookings/invoice?booking=${booking.bookingId}`}>
                      <span className="flex gap-2 items-center"><ListIcon /> Invoice</span>
                    </Link>
                  </Button>
                  <DeleteBookingButtonComponent bookingId={booking.bookingId} />
                  
                </div>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};
export default page;

