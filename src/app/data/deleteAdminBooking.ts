"use server"
import { db } from "@/db"
import { bookings } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function deleteAdminBooking (bookingId: string){
    const data = await db.delete(bookings).where(eq(bookings.bookingId, bookingId))

    if(!data){
        return { success: false, message: "An error occurred while deleting the booking" };
    }
    return { success: true, message: "Booking deleted successfully" };
}