import React from "react";
import type { Metadata } from "next";
import { TfiMinus } from "react-icons/tfi";
import { FaLocationDot } from "react-icons/fa6";
import ImageComponent from "@/components/ImageComponent";
import { LiaBedSolid } from "react-icons/lia";
import { TbAirConditioning } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaWifi } from "react-icons/fa6";
import Footer from "@/components/Footer";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";

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
      console.log("error");
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
  const photo = roomArr[0].images;

  return (
    <>
      <div className="min-h-screen">
        <div className="Header flex justify-between border-b-4 border-slate-400 sticky top-0 backdrop-blur-lg backdrop-filter z-10 py-2 px-8">
          <div className="HeaderLeft px-2">
            <h2 className="RoomName text-4xl font-bold ">
              {roomArr[0]?.name ?? "No name"}
            </h2>
            <div className="RoomLocation flex items-center gap-1">
              <p className="RoomPrice">
                <span className="">${roomArr[0]?.price}</span>
                /night
              </p>
            </div>
          </div>
          <div className="HeaderRight flex items-end">
            <div className="flex items-center gap-1">
              <FaLocationDot />
              <p>{location}</p>
            </div>
          </div>
        </div>

        <div className="RoomPhoto flex gap-2 p-6">
          <div className=" mx-10 ">
            <ImageComponent photo={photo} />
          </div>
          <div className="RoomDescription mr-10 flex flex-col mb-2 ">
            <span className="text-lg font-semibold">Description:</span>

            {roomArr[0]?.description}
          </div>
        </div>

        <div className="AccessoryBox px-10 py-2">
          <p className="AccessoryTitle text-lg font-semibold ">Accessories:</p>
          <div className="AccessoryList text-sm ">
            <p className="flex items-center gap-2 mx-2 ">
              <LiaBedSolid />
              <span className="">Beds: </span>
              {roomArr[0]?.Beds}
            </p>
            <p className="flex items-center gap-2 mx-2 ">
              <TbAirConditioning />
              <span className="">Air-Conditioning: </span>
              {AirC}
            </p>
            <p className="flex items-center gap-2 mx-2 ">
              <IoFastFoodOutline />
              <span className="">Breakfast:</span> {breakfast}
            </p>
            <p className="flex items-center gap-2 mx-2 ">
              <FaWifi />
              <span className="">Wifi:</span> {wifi}
            </p>
          </div>
        </div>
      </div>
        <div className="HomeButton flex justify-center items-center m-2">
          <button className="flex items-center gap-2 bg-gray-200 rounded-md border-2 border-slate-400  hover:bg-gray-300 transition-all p-1">
            <IoHomeOutline />
            <Link href="/">Home</Link>
            </button>
        </div>
        <Footer />
    </>
  );
}
