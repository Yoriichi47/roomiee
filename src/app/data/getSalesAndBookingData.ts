import { db } from "@/db";
import { bookings } from "@/db/schema";
import { isAdmin } from "@/lib/auth-utils";
import { auth } from "@clerk/nextjs/server";
import { count, eq, sql, sum } from "drizzle-orm";
import "server-only";

type DashboardData = {
  totalSales: number;
  totalBookings: number;
};

type QueryResult =
  | { success: true; data: DashboardData; error?: never }
  | { success: false; error: string; data?: never };

const getSalesAndBookingData = async (year?: number): Promise<QueryResult> => {

  if (!year) {
    const currentYear = new Date().getFullYear();
    const totalSalesAndBookings = await db
      .select({
        totalSales: sum(bookings.amountPaid).mapWith(Number),
        totalBookings: count(bookings.bookingId),
      })
      .from(bookings)
      .where(sql`EXTRACT(YEAR FROM ${bookings.createdAt}) = ${currentYear}`);

    return {
      success: true,
      data: {
        totalSales: totalSalesAndBookings[0]?.totalSales || 0,
        totalBookings: totalSalesAndBookings[0]?.totalBookings || 0,
      },
    };
  }
  const totalSalesAndBookings = await db
    .select({
      totalSales: sum(bookings.amountPaid).mapWith(Number),
      totalBookings: count(bookings.bookingId),
    })
    .from(bookings)
    .where(sql`EXTRACT(YEAR FROM ${bookings.createdAt}) = ${year}`);

  return {
    success: true,
    data: {
      totalSales: totalSalesAndBookings[0]?.totalSales || 0,
      totalBookings: totalSalesAndBookings[0]?.totalBookings || 0,
    },
  };
};

export default getSalesAndBookingData;
