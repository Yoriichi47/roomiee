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
      <div className=" min-h-screen ">
        <div className="bg-purple-600 flex justify-between">
          <h2 className=" lg:text-5xl text-white md:text-3xl">
            {roomArr[0]?.name ?? "No name"}
          </h2>
          <p className="md:text-xl lg:text-2xl text-white">
                <span className=" md:text-base lg:text-lg">{location}</span>
              </p>
        </div>

        <div className="flex flex-col lg:flex-row">
          {" "}
          {/* Add gap-4 later*/}
          <div className="img w-2/5 min-h-[40vh] p-2">
            <div className="border h-full bg-[#303030] border-black">Hello</div>
          </div>
          <div className="bg-gray-300 w-[2px]"></div>
          <div className="w-3/5 p-2">
            <div className="border bg-[#303030] border-black min-h-full">
              <p className=" lg:flex lg:flex-col md:text-xl  font-semibold lg:text-2xl">
                <span className="text-red-500">Description:</span>
                <span className="md:text-sm lg:w-[60%] font-normal lg:text-base">
                  {roomArr[0]?.description}
                </span>
              </p>
              <p className="pt-2">
                <span className="lg:text-2xl text-red-500 md:text-xl font-bold">
                  ${roomArr[0]?.price}
                </span>
                /night
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-300  h-[2px] "></div>
        <div className="flex ">
          <div className="w-2/3 min-h-full">
            <div className="Left-Section p-2">
             
              <div className=" bg-[#303030] border border-black">
                <div className=" sm:text-sm flex flex-col gap-4 lg:text-xl">
                  <p className="">
                    <span className="font-semibold ">Beds: </span>
                    {roomArr[0]?.Beds}
                  </p>
                  <p className="">
                    <span className="font-semibold ">Air-Conditioning: </span>
                    {AirC}
                  </p>
                  <p className=" ">
                    <span className="font-semibold ">Breakfast:</span>{" "}
                    {breakfast}
                  </p>
                  <p className=" ">
                    <span className="font-semibold ">Wifi:</span> {wifi}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-300 w-[2px] min-h-full "></div>
          <div className="w-1/3 p-2" >
          <div className="Right-Section border border-black bg-green-500 w-full h-full">
            ksjdf
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
