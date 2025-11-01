import { db } from "@/db";
import { rooms } from "@/db/schema";
import { eq } from "drizzle-orm";
import "server-only"

const getRoomDetails = async ({roomId}: {roomId: string}) => {

    const data = await db.select().from(rooms).where(eq(rooms.roomId, roomId)).limit(1);

    return data[0]

}

export default getRoomDetails;