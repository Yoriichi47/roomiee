import Header from "@/app/components/Header";
import { getUserBookedRoomDetails } from "@/app/data/getUserBookedRooms";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ roomId: string }>;
}) => {
  const roomId = (await searchParams).roomId;

  const data = await getUserBookedRoomDetails(roomId);

  return (
    <>
      <Header />
      <div className="flex justify-center items-start min-h-screen">
        <Card className="mt-10 w-full max-w-4xl bg-zinc-800 border-zinc-800 text-zinc-100">
          <CardHeader className="text-center text-4xl underline underline-offset-2 font-bold">
            Booking Details
          </CardHeader>
          <CardContent>
            <Card className="bg-zinc-700 w-4/5 m-auto border-zinc-700">
              <CardContent className="">
                <Table>
                  {/* <TableCaption>Booking Details</TableCaption> */}
                  <TableBody>
                    <TableRow className="flex justify-between p-2">
                      <TableCell className="font-semibold">
                        Booking ID
                      </TableCell>
                      <TableCell>#{data?.booking.bookingId}</TableCell>
                    </TableRow>
                    <TableRow className="flex justify-between p-2">
                      <TableCell className="font-semibold">Room Name</TableCell>
                      <TableCell>{data?.booking.roomName}</TableCell>
                    </TableRow>
                    <TableRow className="flex justify-between p-2">
                      <TableCell className="font-semibold">
                        User email
                      </TableCell>
                      <TableCell>{data?.user.email}</TableCell>
                    </TableRow>
                    <TableRow className="flex justify-between p-2">
                      <TableCell className="font-semibold">Full Name</TableCell>
                      <TableCell>{data?.user.name}</TableCell>
                    </TableRow>
                    <TableRow className="flex justify-between p-2">
                      <TableCell className="font-semibold">
                        Amount Paid
                      </TableCell>
                      <TableCell>${data?.booking.amountPaid}</TableCell>
                    </TableRow>
                    <TableRow className="flex  justify-between p-2">
                      <TableCell className="font-semibold">
                        Check-in Date
                      </TableCell>
                      <TableCell>
                        {data?.booking.startDate
                          ? `${format(
                              new Date(data.booking.startDate),
                              "MMM dd, yyyy"
                            )} at 12:00 PM`
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="flex justify-between p-2">
                      <TableCell className="font-semibold">
                        Check-out Date
                      </TableCell>
                      <TableCell>
                        {data?.booking.endDate
                          ? `${format(
                              new Date(data.booking.endDate),
                              "MMM dd, yyyy"
                            )} at 12:00 PM`
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="flex justify-between p-2">
                      <TableCell className="font-semibold">
                        Days of Stay
                      </TableCell>
                      <TableCell>{data?.booking.daysOfStay} Days</TableCell>
                    </TableRow>
                  </TableBody>
                  
                  
                </Table>
                    <Button className="bg-zinc-600 hover:bg-zinc-800 transition-all"><Link href={`/bookings/invoice?booking=${data?.booking.bookingId}`}>View Invoice</Link></Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default page;
