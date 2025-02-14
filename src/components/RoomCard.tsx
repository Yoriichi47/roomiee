import React from "react";
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
      <div className="p-4 hover:scale-105 transition-all flex bg-[#303030] flex-col justify-between gap-2 border-2 border-black rounded-lg h-86 m-4 w-80">
        <div className="img w-full min-h-[40%]">
          {" "}
          <Image
            src={room.images?.length > 0 ? room.images[0] : "/images.jpg"}
            className="rounded-md"
            alt={room.name}
            width={400}
            height={100}
          />{" "}
        </div>
        <div>
          <div className="roomName p-2">{room.name}</div>{" "}
          <div className="roomPrice px-2 text-sm">
            <span className="font-semibold">${room.price}</span>
            /night
          </div>
        </div>
        <button className="roomDetailButton p-2 rounded-md text-center border relative bottom-0 border-black w-full bg-purple-700 font-semibold">
          <Link href={`/rooms/${room.roomId}`}>
          Details
          </Link>
        </button>
      </div>
    </>
  );
};

export default RoomCard;
