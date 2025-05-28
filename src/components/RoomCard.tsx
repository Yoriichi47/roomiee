"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  room: {
    roomId: number;
    description: string;
    name: string;
    price: number;
    images: string[];
  };
}

const RoomCard = ({ room }: Props) => {
  return (
    <>
      <div className="p-4 border-2 border-gray-200 transform transition-all flex flex-col justify-between gap-2 shadow-lg m-2 hover:shadow-2xl rounded-lg w-80">
        <div className="img w-full lg:min-h-[40%]">
          {" "}
          <Image
            src={room.images?.length > 0 ? room.images[0] : "/images.jpg"}
            className="rounded-md h-40"
            alt={room.name}
            width={400}
            height={200}
          />{" "}
        </div>
        <div>
          <div className="roomName font-medium p-2">{room.name}</div>{" "}
          <div className="roomPrice px-2 text-sm">
            <span className="font-semibold">${room.price}</span>
            /night
          </div>
        </div>
        <button className="roomDetailButton p-2 transition-transform rounded-md text-center text-white relative bottom-0  w-full bg-blue-600 hover:bg-blue-700 font-semibold">
          <Link href={`/rooms/${room.roomId}`}>
          Details
          </Link>
        </button>
      </div>
    </>
  );
};

export default RoomCard;
