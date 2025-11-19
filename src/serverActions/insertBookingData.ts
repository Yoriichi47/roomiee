"use server"

import { db } from "@/db"
import { bookings } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"

const insertBookingData = async (data: {
    roomId: string,
    startDate: Date,
    endDate: Date,
    amountPaid: number,
    daysOfStay: number,
    paymentInfo: string
}) => {
    
    const { userId } = await auth()

    if (!userId) {
        return null
    }

    await db.insert(bookings).values({
        userId: userId,
        roomId: data.roomId,
        startDate: data.startDate,
        endDate: data.endDate,
        amountPaid: data.amountPaid,
        daysOfStay: data.daysOfStay,
        paymentInfo: data.paymentInfo
    })

    return {success: true, message: "Booking successful"}
}

export default insertBookingData