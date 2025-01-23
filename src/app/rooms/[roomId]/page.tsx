import React from "react";

const fetchRoomDetail = async (roomId: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/rooms/${roomId}`);
    const data = await res.json();

    if (data?.success) {
      console.log("Fetched Room inside function: ", data);
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

const page = async ({ params }: { params: Promise<{ roomId: string }> }) => {
  
  const roomData = await fetchRoomDetail((await params).roomId);
  const roomArr = roomData ? [roomData.room] : [];  // Getting the room object from the array.

  console.log("Data fetched after the function has been executed: ", roomData);
  console.log("Room Array: ", roomArr);

  return (
    <>
      <div>
         <p>Room Id: {roomArr[0]?.roomId ?? "No Room ID available"}</p>
        <br />
        Hrllo
      </div>
    </>
  );
};

export default page;
