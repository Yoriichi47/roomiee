import { db } from "@/db";
import { rooms } from "@/db/schema";
import { isAdmin } from "@/lib/auth-utils";
import { and, eq } from "drizzle-orm";
import "server-only";

export async function getAllRooms({
  city,
  state,
  country,
}: {
  city?: string;
  state?: string;
  country?: string;
}) {
  const searchFilters = [
    city ? eq(rooms.City, city) : undefined,
    state ? eq(rooms.State, state) : undefined,
    country ? eq(rooms.Country, country) : undefined,
  ].filter(Boolean);

  const data = await db
    .select()
    .from(rooms)
    .where(and(searchFilters.length ? and(...searchFilters) : undefined));
  return data;
}

export async function deleteRoomById(roomId: string) {
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    return { success: false, error: "Unauthorized - Admin access required" };
  }

  const deleteRoom = await db.delete(rooms).where(eq(rooms.roomId, roomId));

  return deleteRoom;
}

export async function updateRoom(
  roomId: string,
  {
    city,
    state,
    country,
    zipcode,
    images,
    description,
    price,
  }: {
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
    images?: string[];
    description?: string;
    price?: number;
  }
) {
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    return { success: false, error: "Unauthorized - Admin access required" };
  }

  const [updatedRoom] = await db
    .update(rooms)
    .set({
      ...(city && { City: city }),
      ...(state && { State: state }),
      ...(country && { Country: country }),
      ...(zipcode && { ZipCode: zipcode }),
      ...(images && { images }),
      ...(description && { description }),
      ...(price && { price }),
    })
    .where(eq(rooms.roomId, roomId))
    .returning();

  if (!updatedRoom) {
    return { success: false, error: "Room not found" };
  }

  return { success: true, room: updatedRoom };
}

export async function newRoom({
  roomId,
  city,
  state,
  country,
  zipcode,
  images,
  description,
  price,
  name,
  guestCapacity,
  beds,
  isAirConditioned,
  isWifiAvailable,
  isBreakfastAvailable,
  street,
}: {
  roomId: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  images: string[];
  description: string;
  price: number;
  name: string;
  guestCapacity: number;
  beds: number;
  isAirConditioned: boolean;
  isWifiAvailable: boolean;
  isBreakfastAvailable: boolean;
  street: string;
}) {
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    return { success: false, error: "Unauthorized - Admin access required" };
  }

  const createRoom = await db.insert(rooms).values({
    roomId,
    Street: street,
    City: city,
    State: state,
    Country: country,
    ZipCode: zipcode,
    images,
    description,
    price,
    name,
    guestCapacity,
    Beds: beds,
    isAirConditioned,
    isWifiAvailable,
    isBreakfastAvailable,
  })

  return {success: true, message: "Room created successfully"};
}
