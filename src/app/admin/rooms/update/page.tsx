import RoomUpdateForm from "@/app/components/RoomUpdateForm";
import getRoomDetails from "@/app/data/getRoomDetails";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ roomId: string }>;
}) => {

    const roomId = (await searchParams).roomId;

    const data = await getRoomDetails({roomId});

  return (
    <div>
      <RoomUpdateForm roomData={data} />
    </div>
  );
};

export default page;
