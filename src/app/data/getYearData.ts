"use server"
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { count } from "drizzle-orm";

export async function getYearData() {
    const currentYear = new Date().getFullYear();

    const year = []

    const yearList = await db.select(
        {
            bookingYear: count(bookings.createdAt),
        }
    ).from(bookings)

    for (let i = 0; i < yearList.length; i++) {
        year.push(currentYear - i);
    }
     return year;
}