import RoomDeletePage from "@/app/components/RoomDeletePage";
import getRoomDetails from "@/app/data/getRoomDetails";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ roomId: string }>;
}) => {
  const roomId = (await searchParams).roomId;

  const data = await getRoomDetails({ roomId });

  console.log("Room data:", data);

  return (
    <div>
      <RoomDeletePage roomData={data} />
    </div>
  );
};

export default page;
