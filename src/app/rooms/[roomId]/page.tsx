import React from "react";
import type { Metadata } from "next";
import { TfiMinus } from "react-icons/tfi";
import ImageComponent from "@/components/ImageComponent";
import BreakerHorizontal from "@/components/BreakerHorizontal";

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
  const photo = roomArr[0].images[0];
  // console.log(roomArr);

  return (
    <>
      <div className="backdrop-blur-lg  min-h-screen">
        <div className=" flex py-4 justify-between gap-4 border-b-2 border-gray-600">
          <h2 className=" lg:text-4xl ml-20 pl-2 md:text-xl">
            {roomArr[0]?.name ?? "No name"}
          </h2>
          <p className="md:text-base lg:text-lg px-4 content-end ">
            {location}
          </p>
        </div>
        <div className="flex ">
          <div className="p-4">
            {" "}
            <div className="flex justify-evenly">
              <div className="img min-w-3/5">
                <div>
                  <ImageComponent photo={photo} />
                </div>
              </div>
              <div className="w-2/5">
                <div className="">
                  <div className="pr-4">
                    <p className=" lg:flex lg:flex-col md:text-xl  font-semibold lg:text-2xl">
                      <span className="">Description:</span>
                      <span className="md:text-sm   font-normal lg:text-base">
                        {roomArr[0]?.description}
                      </span>
                    </p>
                    <p className="pt-4  ">
                      <span className="lg:text-2xl  md:text-xl font-semibold">
                        ${roomArr[0]?.price}
                      </span>
                      /night
                    </p>
                    <div className="features md:text-sm  font-normal lg:text-base gap-4">
                      <p className=" lg:flex lg:flex-col pt-4 md:text-xl  font-semibold lg:text-2xl">
                        <span className="">Accessories:</span>
                      </p>
                      <div className="pl-2">
                        <p className="pt-2 flex gap-2">
                          <span className="content-center">
                            <TfiMinus />
                          </span>
                          <span className="font-semibold ">Beds: </span>
                          {roomArr[0]?.Beds}
                        </p>
                        <p className="pt-2 flex gap-2">
                          <span className="content-center">
                            <TfiMinus />
                          </span>
                          <span className="font-semibold ">
                            Air-Conditioning:{" "}
                          </span>
                          {AirC}
                        </p>
                        <p className="pt-2 flex gap-2">
                          <span className="content-center">
                            <TfiMinus />
                          </span>
                          <span className="font-semibold ">Breakfast:</span>{" "}
                          {breakfast}
                        </p>
                        <p className="pt-2 flex gap-2">
                          <span className="content-center">
                            <TfiMinus />
                          </span>
                          <span className="font-semibold ">Wifi:</span> {wifi}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BreakerHorizontal />
      </div>
    </>
  );
}
