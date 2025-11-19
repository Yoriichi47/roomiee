import { db } from "@/db";
import { bookings, rooms } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { start } from "repl";
import "server-only";

export async function getUserBookedRooms() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  try {
    const data = await db
      .select({
        amountPaid: bookings.amountPaid,
        daysOfStay: bookings.daysOfStay,
        roomId: bookings.roomId,
        roomName: rooms.name,
        roomImages: rooms.images,
        roomStreet: rooms.Street,
        roomCity: rooms.City,
        roomState: rooms.State,
        roomCountry: rooms.Country,
        roomZipCode: rooms.ZipCode,
      })
      .from(bookings)
      .leftJoin(rooms, eq(bookings.roomId, rooms.roomId))
      .where(eq(bookings.userId, userId));

    return { success: true, bookings: data };
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return { success: false, bookings: [], error: "Failed to fetch bookings" };
  }
}

export async function getUserBookedRoomDetails(roomId: string) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db
    .select({
      amountPaid: bookings.amountPaid,
      daysOfStay: bookings.daysOfStay,
      roomId: bookings.roomId,
      roomName: rooms.name,
      roomImages: rooms.images,
      roomStreet: rooms.Street,
      roomCity: rooms.City,
      roomState: rooms.State,
      roomCountry: rooms.Country,
      roomZipCode: rooms.ZipCode,
      startDate: bookings.startDate,
      endDate: bookings.endDate,
      bookingId: bookings.bookingId,
    })
    .from(bookings)
    .leftJoin(rooms, eq(bookings.roomId, rooms.roomId))
    .where(and(eq(bookings.userId, userId), eq(bookings.roomId, roomId)));

  const user = await currentUser();

  return {
    success: true,
    booking: data[0],
    user: {
      name:
        user?.firstName && user?.lastName
          ? `${user.firstName} ${user.lastName}`
          : user?.username || "Guest",
      email: user?.emailAddresses[0]?.emailAddress || "",
    },
  };
}
export async function getRoomDetailsForInvoice(bookingId: string) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, booking: null, user: null, error: "Unauthorized" };
  }

  try {
    const data = await db
      .select({
        amountPaid: bookings.amountPaid,
        daysOfStay: bookings.daysOfStay,
        roomId: bookings.roomId,
        roomName: rooms.name,
        roomImages: rooms.images,
        roomStreet: rooms.Street,
        roomCity: rooms.City,
        roomState: rooms.State,
        roomCountry: rooms.Country,
        roomZipCode: rooms.ZipCode,
        startDate: bookings.startDate,
        endDate: bookings.endDate,
        bookingId: bookings.bookingId,
        roomPrice: rooms.price, 
        createdAt: bookings.createdAt
      })
      .from(bookings)
      .leftJoin(rooms, eq(bookings.roomId, rooms.roomId))
      .where(and(eq(bookings.userId, userId), eq(bookings.bookingId, bookingId)));

    if (!data || data.length === 0) {
      return { success: false, booking: null, user: null, error: "Booking not found" };
    }

    const user = await currentUser();

    return {
      success: true,
      booking: data[0],
      user: {
        name:
          user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : user?.username || "Guest",
        email: user?.emailAddresses[0]?.emailAddress || "",
      },
    };
  } catch (error) {
    console.error("Error fetching invoice details:", error);
    return { success: false, booking: null, user: null, error: "Failed to fetch invoice details" };
  }
}