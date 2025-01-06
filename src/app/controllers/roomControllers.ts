import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const allRooms = async (
  req: NextRequest,
  {
    params,
  }: { params: Promise<{ city?: string; state?: string; country?: string }> }
) => {
  const rooms = await prisma.room.findMany();
  const responsePerPage = 6;
  const city = (await params).city;
  const state = (await params).state;
  const country = (await params).country;

  console.log(`Filtered property: ${city || state || country}`);

  if (city) {
    const rooms = await prisma.room.findMany({
      where: {
        City: {
          equals: city,
          mode: "insensitive",
        }
        
      },
    });
    return NextResponse.json({ success: true, responsePerPage, rooms });
  } else if (state) {
    const rooms = await prisma.room.findMany({
      where: {
        State: {
          equals: state,
          mode: "insensitive",
        }
      },
    });
    return NextResponse.json({ success: true, responsePerPage, rooms });
  } else if (country) {
    const rooms = await prisma.room.findMany({
      where: {
        Country: {
          equals: country,
          mode: "insensitive",
        }
      },
    });
    return NextResponse.json({ success: true, responsePerPage, rooms });
  } else {
    return NextResponse.json({ success: true, responsePerPage, rooms });
  }
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

export const getRoomByLocation = async () => {
  // const searchParams = useSearchParams()
  // const city = searchParams.get("city")
  // return NextResponse.json({city})
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
