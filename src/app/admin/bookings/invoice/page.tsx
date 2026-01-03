import { getRoomDetailsForInvoice } from "@/app/data/getUserBookedRooms";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import React from "react";
import Image from "next/image";
import { InvoiceDownloadButton } from "@/app/components/InvoiceDownloadButton";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ booking: string }>;
}) => {
  const booking = (await searchParams).booking;

  const data = await getRoomDetailsForInvoice(booking);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-end items-end">
        <InvoiceDownloadButton bookingId={booking} />
        </div>
        <div id="invoice_element" className="bg-white min-w-full text-black pt-2 p-4 my-6">
          <header>
            <Image
            src="/logo_LightMode.png"
            height={200}
            width={200}
            alt="Roomie Logo"
            className="mx-auto h-12 w-auto"
            />
          </header>
          <section className="h-10 bg-zinc-200 flex justify-center mt-2 items-center w-full text-xl">
            <p> INVOICE &nbsp; #{booking}</p>
          </section>
          <div className="flex justify-between text-sm my-4">
            <div>
              <p>Name: {data?.user?.name}</p>
              <p>Email: {data?.user?.email}</p>
              <p>
                Date:{" "}
                {data?.booking?.createdAt
                  ? format(
                      new Date(data.booking.createdAt),
                      "dd MMMM yyyy"
                    )
                  : "N/A"}
              </p>
              <p>Amount: ${data?.booking?.amountPaid}</p>
            </div>
            <div className="text-right">
              <p>Roomie</p>
              <p>123 Avenue,</p>
              <p>XYZ, 123456, US</p>
              <p>123-456-7890</p>
              <p>info@roomie.com</p>
            </div>
          </div>
          <div>
            <Table className="bg-zinc-200">
              <TableHeader className="text-xs">
                <TableRow>
                  <TableCell className="max-w-full">Room</TableCell>
                  <TableCell className="w-1/6">Price Per Night</TableCell>
                  <TableCell className="w-1/6">Check-in Date</TableCell>
                  <TableCell className="w-1/6">Check-out Date</TableCell>
                  <TableCell className="w-1/6">Days of Stay</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-zinc-300 text-xs">
                <TableRow>
                  <TableCell className="text-wrap">{data?.booking?.roomName}</TableCell>
                  <TableCell>${data?.booking?.roomPrice}</TableCell>
                  <TableCell>
                    {data?.booking?.startDate
                      ? format(new Date(data.booking.startDate), "dd MMMM yyyy")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {data?.booking?.endDate
                      ? format(new Date(data.booking.endDate), "dd MMMM yyyy")
                      : "N/A"}
                  </TableCell>
                  <TableCell>{data?.booking?.daysOfStay}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="text-right my-4 font-semibold">
            <p>Total Amount: &nbsp; &nbsp; ${data?.booking?.amountPaid}</p>
          </div>
          <div className="text-xs">
            <p>NOTICE: </p>
            <p>THIS IS A SYSTEM GENERATED INVOICE.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
