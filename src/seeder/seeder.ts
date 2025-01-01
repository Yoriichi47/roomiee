import { prisma } from "../prisma";
import { rooms } from "./data";

const seedRooms = async () => {
    try {
        await prisma.room.deleteMany();
        console.log("Rooms deleted");

        await prisma.room.createMany({ data: rooms })
        console.log("Rooms created");

    } catch (error) {
        if (error instanceof Error) {
            console.error("error:", error.stack);
        }     
        process.exit();
    }
}

seedRooms()