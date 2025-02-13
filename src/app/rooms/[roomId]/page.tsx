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
  // console.log(roomArr);

  return (
    <>
      <div className="">
        <div className="bg-purple-600">
          <h2 className=" lg:text-5xl p-4 text-white md:text-3xl">
            {roomArr[0]?.name ?? "No name"}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-4">
          <div className="img  p-2">
            <div className="border border-black min-h-[30%] w-[50%]">HEllo</div>
          </div>
          <div className="bg-gray-300 w-[2px]"></div>
          <div className="p-10">
            <p className=" lg:flex lg:flex-col md:text-xl text-red-500 font-semibold lg:text-2xl">
              Description: <br />{" "}
              <span className="md:text-sm lg:w-[60%] text-black font-normal lg:text-base">
                {roomArr[0]?.description}
              </span>
            </p>
            <p className="pt-2 mx-2  ">
              <span className="lg:text-2xl text-red-500 md:text-xl font-bold">
                ${roomArr[0]?.price}
              </span>
              /night
            </p>
          </div>
        </div>
        <div className="bg-gray-300  h-[2px] "></div>
        <div className="flex">
          <div className="w-2/3">
            <div className="Left-Section">
              <p className="p-4 md:text-xl lg:text-2xl ">
                <span className=" md:text-base lg:text-base">{location}</span>
              </p>
              <div className="m-2 pt-2 md:text-xl lg:text-2xl  ">
                <span className="md:text-xl text-red-500 font-semibold lg:text-2xl">
                  Features:
                </span>
                <div className=" md:text-sm lg:text-base ">
                  <p className="">
                    <span className="font-semibold ">Beds:</span>{" "}
                    {roomArr[0]?.Beds}
                  </p>
                  <p className=" px-2">
                    <span className="font-semibold ">Air-Conditioning:</span>
                    {AirC}
                  </p>
                  <p className=" px-2">
                    <span className="font-semibold ">Breakfast:</span>{" "}
                    {breakfast}
                  </p>
                  <p className=" px-2">
                    <span className="font-semibold ">Wifi:</span> {wifi}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-300 w-[2px] "></div>
          <div className="Right-Section bg-green-500 mt-2 p-2 mx-2 w-1/3">
            ksjdf
          </div>
        </div>
      </div>
    </>
  );
}
