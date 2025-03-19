import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const allRooms = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      city?: string;
      state?: string;
      country?: string;
      guestcapacity?: number;
      beds?: number;
      isbreakfastavailable?: boolean;
      iswifiavailable?: boolean;
      isairconditioned?: boolean;
    }>;
  }
) => {
  const { city, state, country, guestcapacity, beds, isbreakfastavailable, iswifiavailable, isairconditioned } = await params;

  const localBreakfastVariable = JSON.stringify(isbreakfastavailable);
  const localWifiVariable = JSON.stringify(iswifiavailable);
  const localAirConditionerVariable = JSON.stringify(isairconditioned);

  // Build the query object dynamically
  const whereConditions: any = {};

  if (city) {
    whereConditions.City = {
      equals: city,
      mode: "insensitive",
    };
  }

  if (state) {
    whereConditions.State = {
      equals: state,
      mode: "insensitive",
    };
  }

  if (country) {
    whereConditions.Country = {
      equals: country,
      mode: "insensitive",
    };
  }

  if (guestcapacity) {
    whereConditions.guestCapacity = guestcapacity;
  }

  if(beds){
    whereConditions.Beds = beds
  }

  if (localBreakfastVariable) {
    whereConditions.isBreakfastAvailable = isbreakfastavailable;
  }

  if (localWifiVariable) {
    whereConditions.isWifiAvailable = iswifiavailable;
  }

  if (localAirConditionerVariable) {
    whereConditions.isAirConditioned = isairconditioned;
  }

  // Fetch rooms based on the constructed query
  const rooms = await prisma.room.findMany({
    where: whereConditions,
  });

  return NextResponse.json({ success: true,  rooms: Array.isArray(rooms) ? rooms : [] });
};

export const newRoom = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const room = await prisma.room.create({ data: body });
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
  { params }: { params: Promise<{ roomId: string }> }
) => {
  const roomId = (await params).roomId;
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
  { params }: { params: Promise<{ roomId: string }> }
) => {
  // Based on the room ID, update the room details
  try {
    const body = await req.json();
    const roomId = (await params).roomId;
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

export const deleteRoom = async (
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) => {
  const roomId = (await params).roomId;
  try {
    const room = await prisma.room.delete({
      where: {
        roomId,
      },
    });

    if (!room || !room.roomId) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Room deleted" });
  } catch (error) {
    if (error instanceof Error) console.log("error: ", error.stack);
  }
};
