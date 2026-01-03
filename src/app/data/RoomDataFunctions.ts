"use server";
import { db } from "@/db";
import { rooms } from "@/db/schema";
import { isAdmin } from "@/lib/auth-utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

type newRoomData = {
  name: string;
  description: string;
  price: number;
  images: string[];
  Street: string;
  State: string;
  City: string;
  Country: string;
  ZipCode: string;
  guestCapacity: number;
  Beds: number;
  isAirConditioned: boolean;
  isWifiAvailable: boolean;
  isBreakfastAvailable: boolean;
};

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

  const deleteRoom = await db.delete(rooms).where(eq(rooms.roomId, roomId));

  if(!deleteRoom) {
    return { success: false, message: "An error occurred while deleting the room" };
  }

  return { success: true, message: "Room deleted successfully" };
}

export async function updateRoom(
  roomId: string, data: newRoomData
  
) {

  const [updatedRoom] = await db
    .update(rooms)
    .set({
      ...(data.name && { name: data.name }),
      ...(data.Beds && { Beds: data.Beds }),
      ...(data.Street && { Street: data.Street }),
      ...(data.guestCapacity && { guestCapacity: data.guestCapacity }),
      ...(data.isAirConditioned && { isAirConditioned: data.isAirConditioned }),
      ...(data.isWifiAvailable && { isWifiAvailable: data.isWifiAvailable }),
      ...(data.isBreakfastAvailable && { isBreakfastAvailable: data.isBreakfastAvailable }),
      ...(data.State && { State: data.State }),
      ...(data.Country && { Country: data.Country }),
      ...(data.ZipCode && { ZipCode: data.ZipCode }),
      ...(data.images && { images: data.images }),
      ...(data.description && { description: data.description }),
      ...(data.price && { price: data.price }),
    })
    .where(eq(rooms.roomId, roomId))
    .returning();

  if (!updatedRoom) {
    return { success: false, messagea: "Room not found" };
  }

  return { success: true, room: updatedRoom, message: "Room updated successfully" };
}

export async function newRoom(data: newRoomData) {
  const user = await currentUser();
  const adminCheck = user?.publicMetadata?.role === "adminrole";
  if (adminCheck !== true) {
    return { success: false, message: "Unauthorized - Admin access required" };
  }

  const { userId } = await auth();

  await db.insert(rooms).values({
    Street: data.Street,
    City: data.City,
    State: data.State,
    Country: data.Country,
    ZipCode: data.ZipCode,
    images: data.images,
    description: data.description,
    price: data.price,
    name: data.name,
    guestCapacity: data.guestCapacity,
    Beds: data.Beds,
    isAirConditioned: data.isAirConditioned,
    isWifiAvailable: data.isWifiAvailable,
    isBreakfastAvailable: data.isBreakfastAvailable,
    createdBy: userId!,
  });

  return { success: true, message: "Room created successfully" };
}
