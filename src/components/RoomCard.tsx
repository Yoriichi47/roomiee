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
      <div className="p-4 transform transition-all flex backdrop-blur-2xl flex-col justify-between gap-2 shadow-lg m-2 hover:shadow-2xl rounded-lg w-80">
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
          <div className="roomName font-medium p-2">{room.name}</div>{" "}
          <div className="roomPrice px-2 text-sm">
            <span className="font-semibold">${room.price}</span>
            /night
          </div>
        </div>
        <button className="roomDetailButton p-2 transition-transform hover:scale-[1.02] rounded-md text-center border text-white relative bottom-0 border-black w-full bg-purple-700 font-semibold">
          <Link href={`/rooms/${room.roomId}`}>
          Details
          </Link>
        </button>
      </div>
    </>
  );
};

export default RoomCard;
