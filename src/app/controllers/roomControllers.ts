import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const allRooms = async (req: NextRequest) => {
  return NextResponse.json({ message: "Hello, Room route" });
};

export const newRoom = async (req: NextRequest) => {
    try {
      const body = await req.json();
    const room = await prisma.room.create({
        data: {
            name: body.name,
        roomId: body.roomId, // Convert roomId to a string
        description: body.description,
        price: parseFloat(body.price),
        Street: body.Street,
        City: body.City,
        State: body.State,
        Country: body.Country,
        ZipCode: body.ZipCode, // Convert ZipCode to a string
        guestCapacity: parseInt(body.guestCapacity),
        Beds: body.beds,
        isWifiAvailable: body.isWifiAvailable,
        isBreakfastAvailable: body.isBreakfastAvailable,
        isAirConditioned: body.isAirConditioned,
        images: body.images,
        }
    });

    return NextResponse.json({
      message: "Room created",
      room,
    });
  } catch (error) {
    if( error instanceof Error){
        console.error("error:", error.stack);
        // throw new Error("Error creating room");
    }
  }
};
