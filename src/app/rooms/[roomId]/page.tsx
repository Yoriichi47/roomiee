import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

interface props {
  params: Promise<{ roomId: string }>;
}

const fetchRoomDetail = async (roomId: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/rooms/${roomId}`);
    const data = await res.json();

    if (data?.success) {
      return data;
    } else {
      console.error("Error fetching data");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error:", error.stack);
    }
  }
};

export const generateMetadata = async ({
  params,
}: props): Promise<Metadata> => {
  const localRoomId = (await params).roomId;

  const roomData = await fetchRoomDetail(localRoomId);
  const roomArr = roomData ? [roomData.room] : [];

  return {
    title: roomArr[0]?.name || "Room name",
    description: roomArr[0]?.description || "No Room Description",
  };
};

export default async function page({ params }: props) {
  const roomData = await fetchRoomDetail((await params).roomId);
  const roomArr = roomData ? [roomData.room] : []; // Getting the room object from the array.
  const location =
    roomArr[0].Street +
    ", " +
    roomArr[0].City +
    ", " +
    roomArr[0].State +
    ", " +
    roomArr[0].Country +
    ", " +
    roomArr[0].ZipCode;
  const breakfast = roomArr[0].isBreakfastAvailable ? "Yes" : "No";
  const AirC = roomArr[0].isAirConditioned ? "Yes" : "No";
  const wifi = roomArr[0].isWifiAvailable ? "Yes" : "No";
  // console.log(roomArr);

  return (
    <>
      <div className="p-4 flex h-screen flex-col justify-between gap-4 ">
        <div className="img w-full min-h-[50%]">
          <Image
            src={
              roomArr[0]?.images?.length > 0
                ? roomArr[0]?.images[0]
                : "/images.jpg"
            }
            className="rounded-md m-auto"
            alt={roomArr[0]?.name}
            width={400}
            height={100}
          />
        </div>
        {/* <p className="">Room Id: {roomArr[0]?.roomId ?? "No Room ID available"}</p>
        <br /> */}
        <h2 className=" lg:text-5xl md:text-3xl font-semibold">
          {roomArr[0]?.name ?? "No name"}
        </h2>
        <p className="">
          <span className="lg:text-2xl">${roomArr[0]?.price}</span>/night
        </p>
        <p className="">
          Description: <br />{" "}
          <span className="lg:text-xl">{roomArr[0]?.description}</span>
        </p>
        <p className="">
          Location: <br /> <span className="lg:text-2xl">{location}</span>
        </p>
        <div className="my-10">
          <p className="">Beds: {roomArr[0]?.Beds}</p>
          <p className="">Air-Conditioning: {AirC}</p>
          <p className="">Breakfast: {breakfast}</p>
          <p className="">Wifi: {wifi}</p>
        </div>
      </div>
    </>
  );
}
