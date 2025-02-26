"use client";
import React from "react";
import { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import RoomCard from "./RoomCard";

interface Props {
  rooms: {
    success: boolean;
    roomId: number;
    name: string;
    price: number;
    description: string;
    images: string[];
  }[];
}

const HomePage = ({ rooms }: Props) => {
  // useEffect(() => {
  //   toast.success("This is a trial success message!!!");
  //   toast.error("This is a trial error message!!!");
  // }, []);

  // const success = Array.isArray(rooms) && rooms.length > 0;
  // console.log("Here:", success);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="flex mx-auto">
        <div className="grid p-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto">
          {!rooms ? (
            <div className="min-h-screen">No rooms available</div>
          ) : (
            rooms?.map((room) => <RoomCard key={room.roomId} room={room} />)
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
