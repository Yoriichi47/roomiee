import { db } from "@/db";
import { rooms } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getRoomsByAdmin() {
    const { userId } = await auth();
  try {
    const adminRooms = await db
      .select()
      .from(rooms)
      .where(eq(rooms.createdBy, userId));

    return {
      success: true,
      message: "Rooms fetched successfully",
      data: adminRooms,
    };
  } catch (error) {
    console.error("Error fetching admin rooms:", error);
    return {
      success: false,
      message: "Failed to fetch rooms",
      data: [],
    };
  }
}
