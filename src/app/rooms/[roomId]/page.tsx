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
  const photo = roomArr[0].images;
  // console.log("Photos: ", photo)

  return (
    <>
      <div className="backdrop-blur-lg min-h-screen">
        <div className="lg:flex md:pt-2 lg:pt-4 container mx-auto lg:justify-between lg:gap-4 md:gap-2">
          <h2 className="lg:text-4xl font-semibold md:px-2 lg:px-4 md:text-xl">
            {roomArr[0]?.name ?? "No name"}
          </h2>
          <p className="md:text-sm md:px-2 lg:text-lg lg:px-4 content-end">
            {location}
          </p>
        </div>
        <div className="mx-auto container">
          <div className="lg:p-4 md:p-2">
            {" "}
            <div className="lg:flex container gap-4">
              <div className="img md:px-4 min-h-[50vh]">
                <div className="w-full">
                  <ImageComponent photo={photo} />
                </div>
              </div>
              <div className="lg:w-2/5 md:pt-2 md:w-4/5">
                <div>
                  <div>
                    <p className="flex md:flex-col lg:flex-col md:text-xl font-semibold lg:text-2xl">
                      <span>Description:</span>
                      <span className="md:text-sm font-normal lg:text-base">
                        {roomArr[0]?.description}
                      </span>
                    </p>
                    <p className="md:pt-2 lg:pt-4 md:text-sm lg:text-base">
                      <span className="lg:text-2xl md:text-xl font-semibold">
                        ${roomArr[0]?.price}
                      </span>
                      /night
                    </p>
                    <div className="features md:text-sm  font-normal lg:text-base gap-4">
                      <p className=" lg:flex lg:flex-col md:pt-2 lg:pt-4 md:text-xl font-semibold lg:text-2xl">
                        Accessories:
                      </p>
                      <div className="md:pl-2 lg:pl-4">
                        <p className="lg:pt-2 md:pt-1 flex gap-2">
                          <span className="content-center">
                            <TfiMinus />
                          </span>
                          <span className="font-semibold ">Beds: </span>
                          {roomArr[0]?.Beds}
                        </p>
                        <p className="lg:pt-2 md:pt-1 flex gap-2">
                          <span className="content-center">
                            <TfiMinus />
                          </span>
                          <span className="font-semibold ">
                            Air-Conditioning:{" "}
                          </span>
                          {AirC}
                        </p>
                        <p className="lg:pt-2 md:pt-1 flex gap-2">
                          <span className="content-center">
                            <TfiMinus />
                          </span>
                          <span className="font-semibold ">Breakfast:</span>{" "}
                          {breakfast}
                        </p>
                        <p className="lg:pt-2 md:pt-1 flex gap-2">
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
        {/* <BreakerHorizontal /> */}
      </div>
    </>
  );
}
