"use server";

import { db } from "@/db";
import { bookings } from "@/db/schema";
import { and, eq, gte } from "drizzle-orm";
import { eachDayOfInterval } from "date-fns";

const getBookedDates = async (roomId: string) => {
  try {
    const roomBookings = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.roomId, roomId),
          gte(bookings.endDate, new Date())
        )
      );

    const disabledDates = roomBookings.flatMap(booking => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      
      return eachDayOfInterval({ start, end });
    });

    return {
      success: true,
      bookedDates: disabledDates
    };
  } catch (error) {
    return {
      success: false,
      bookedDates: [],
      error: "Failed to fetch booked dates"
    };
  }
}

export default getBookedDates;