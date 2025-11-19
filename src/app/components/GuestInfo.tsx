"use client";

import * as React from "react";
import bcrypt from "bcrypt";
import { differenceInCalendarDays, format, startOfToday } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";
import insertBookingData from "@/serverActions/insertBookingData";
import getBookedDates from "@/serverActions/getBookedDates";

export function GuestInfo({
  maxGuests,
  totalPrice,
  roomId,
}: {
  maxGuests?: number;
  totalPrice?: number;
  roomId: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [guest, setGuest] = React.useState<string>("");
  const [bookedDates, setBookedDates] = React.useState<Date[]>([]); 
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
  const fetchBookedDates = async () => {
    setLoading(true);
    const data = await getBookedDates(roomId);
    if (data.success) {
      setBookedDates(data.bookedDates);
    }
    setLoading(false);
  };

  fetchBookedDates();
}, [roomId]);

  const formattedRange =
    date?.from && date?.to
      ? `${format(date.from, "MMM d")} - ${format(date.to, "MMM d, yyyy")}`
      : date?.from
      ? `${format(date.from, "MMM d, yyyy")}`
      : "Select dates";

  const totalDays =
    date?.from && date?.to
      ? differenceInCalendarDays(date.to, date.from) + 1
      : 0;

  const handleBooking = async () => {
    if (!date?.from || !date?.to) {
      alert("Please select a date range first!");
      return;
    }

    const data = await insertBookingData({
      roomId: roomId,
      startDate: date?.from!,
      endDate: date?.to!,
      amountPaid: (totalPrice || 0) * totalDays,
      daysOfStay: totalDays,
      paymentInfo: "Sample Payment Info",
    });

    if (data?.success) {
      alert("Booking Successful!");
    } else {
      alert("Booking failed!");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Select Date Range:</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-64 justify-between font-normal text-left bg-zinc-800 text-zinc-200 hover:bg-zinc-900"
                disabled={loading}
              >
                {loading ? "Loading..." : formattedRange}
                <ChevronDownIcon className="h-4 w-4 opacity-70" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
  className="w-auto overflow-hidden p-0 bg-zinc-800 border-zinc-700"
  align="start"
>
  <Calendar
  mode="range"
  selected={date}
  onSelect={setDate}
  disabled={bookedDates}
  modifiers={{
    disabled: [{ before: startOfToday() }, ...bookedDates]
  }}
  defaultMonth={date?.from}
/>
</PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Number of Guests:</p>
          <Select value={guest} onValueChange={setGuest}>
            <SelectTrigger className="bg-zinc-800 hover:bg-zinc-900">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-700 p-0 border-zinc-600">
              <SelectGroup>
                {Array.from({ length: maxGuests || 1 }, (_, i) => (
                  <SelectItem
                    className="hover:bg-zinc-900 rounded-md"
                    key={i}
                    value={(i + 1).toString()}
                  >
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="bg-zinc-400 h-[1px] w-full my-2"></div>
        <div className="text-zinc-200">
          <div className="flex justify-between">
            <p>Total days of stay:</p>
            <p>{totalDays}</p>
          </div>
          <div className="flex justify-between">
            <p>Total guests:</p>
            <p>{guest || "0"}</p>
          </div>
          <div className="flex justify-between ">
            <p>Base Price:</p>
            <p>${totalPrice}</p>
          </div>
        </div>
        <div className="bg-zinc-400 my-1 h-[1px] w-full"></div>
        <div className="flex justify-between">
          <p>Total Price:</p>
          <p>${(totalPrice || 0) * totalDays}</p>
        </div>
        <div className="w-full">
          {/* Link to checkout roomId/price=& */}
          <Button
            disabled={!date?.from || !date?.to || loading}
            onClick={handleBooking}
            className="bg-zinc-800 w-full border-2 border-zinc-800 duration-75 hover:bg-zinc-600"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
}
