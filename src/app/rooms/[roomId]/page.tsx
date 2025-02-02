import React from "react";
import type { Metadata, ResolvingMetadata } from "next";

interface props {
  params: Promise<{ roomId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
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

// export const generateMetaData = async ({
//   params, searchParams
// }: props): Promise<Metadata> => {
//   const localRoomId = (await params).roomId;

//   const roomData = await fetchRoomDetail(
//     `http://localhost:/3000/api/rooms/${localRoomId}`
//   ).then((res) => res.json());

  

//   return {
//     // title: roomData?.room || "Room name",
//     // description: roomData?.room?.description ?? "No Room Description",
//   };
// };

export default async function page({ params }: props) {
  const roomData = await fetchRoomDetail((await params).roomId);
  const roomArr = roomData ? [roomData.room] : []; // Getting the room object from the array.

  return (
    <>
      <div>
        <p>Room Id: {roomArr[0]?.roomId ?? "No Room ID available"}</p>
        <br />
        Hrllo
      </div>
    </>
  );
}
