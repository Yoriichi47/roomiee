import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const allRooms = async (req: NextRequest) => {
  const rooms = await prisma.room.findMany();
  const responsePerPage = 6;
  return NextResponse.json({ success: true, responsePerPage, rooms });
};

export const newRoom = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const room = await prisma.room.create({ data: body });
    // const room = await prisma.room.create({
    //   data: {
    //     name: body.name,
    //     roomId: body.roomId, // Convert roomId to a string
    //     description: body.description,
    //     price: parseFloat(body.price),
    //     Street: body.Street,
    //     City: body.City,
    //     State: body.State,
    //     Country: body.Country,
    //     ZipCode: body.ZipCode, // Convert ZipCode to a string
    //     guestCapacity: parseInt(body.guestCapacity),
    //     Beds: body.Beds,
    //     isWifiAvailable: body.isWifiAvailable,
    //     isBreakfastAvailable: body.isBreakfastAvailable,
    //     isAirConditioned: body.isAirConditioned,
    //     images: body.images,
    //   },
    // });

    return NextResponse.json({
      message: "Room created",
      room,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("error:", error.stack);
    }
  }
};

export const getRoomDetails = async (
  req: NextRequest,
  { params }: { params: { roomId: string } }
) => {
  const { roomId } = params;
  try {
    const room = await prisma.room.findUnique({
      where: {
        roomId,
      },
    });

    if (!room || !room.roomId) {
      return NextResponse.json(
        { success: false, message: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, room });
  } catch (error) {
    if (error instanceof Error) {
      console.log("error:", error.stack);
    }
  }
};

export const updateRoom = async (
  req: NextRequest,
  { params }: { params: { roomId: string } }
) => {
  // Based on the room ID, update the room details
  try {
    const body = await req.json();
    const { roomId } = params;
    const room = await prisma.room.update({
      where: {
        roomId,
      },
      data: body,
    });
    if (!room || !room.roomId) {
      return NextResponse.json(
        { success: false, message: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, room });
  } catch (error) {
    if (error instanceof Error) {
      console.error("error:", error.stack);
    }
  }
};

export const deleteRoom = async (req: NextRequest, {params}: {params: {roomId: string}}) => {
  const {roomId} = params
  try {
    const room = await prisma.room.delete({
      where: {
        roomId,
      }
    })

    if(!room || !room.roomId){
      return NextResponse.json({message: "Room not found"}, {status: 404})
    }

    return NextResponse.json({success: true, message: "Room deleted"})
  } catch (error) {
    if(error instanceof Error)
      console.log("error: ", error.stack)
  }
}