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
  console.log(room);
  return (
    <>
      <div className="p-4 flex  flex-col justify-between gap-2 border-2 border-black rounded-lg h-96 m-4 w-72">
        <div className="img w-full min-h-[50%]">
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
          <div className="roomName p-2 font-semibold">{room.name}</div>{" "}
          <div className="roomPrice pt-2 px-2 border-t-2 border-black text-sm">
            <span className="font-semibold">${room.price}</span>
            /night
          </div>
        </div>
        <button className="roomDetailButton p-2 rounded-md text-center border w-full bg-purple-600 text-white font-semibold">
          <Link href={`/rooms/${room.roomId}`}>
          Details
          </Link>
        </button>
      </div>
    </>
  );
};

export default RoomCard;
