"use server";

import { db } from "@/db";
import { bookings } from "@/db/schema";

export async function getSalesDataByMonth(year: number) {
  try {
    const allBookings = await db
      .select({
        createdAt: bookings.createdAt,
        amountPaid: bookings.amountPaid, 
      })
      .from(bookings);

    const yearBookings = allBookings.filter(booking => {
      const bookingYear = new Date(booking.createdAt).getFullYear();
      return bookingYear === year;
    });

    const monthData = [
      { month: "January", sales: 0 },
      { month: "February", sales: 0 },
      { month: "March", sales: 0 },
      { month: "April", sales: 0 },
      { month: "May", sales: 0 },
      { month: "June", sales: 0 },
      { month: "July", sales: 0 },
      { month: "August", sales: 0 },
      { month: "September", sales: 0 },
      { month: "October", sales: 0 },
      { month: "November", sales: 0 },
      { month: "December", sales: 0 },
    ];

    yearBookings.forEach(booking => {
      const monthIndex = new Date(booking.createdAt).getMonth();
      monthData[monthIndex].sales += Number(booking.amountPaid) || 0;  
    });

    return { success: true, data: monthData };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Failed to fetch data", data: [] };
  }
}