"use client";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import RoomCard from "./RoomCard";
import { useSearchParams } from "next/navigation";
import SearchBarContainer from "./SearchBarContainer";

interface Room {
  success: boolean;
  roomId: number;
  name: string;
  price: number;
  city?: string;
  state?: string;
  country?: string;
  airconditioning?: boolean;
  wifi?: boolean;
  breakfast?: boolean;
  description: string;
  images: string[];
}

interface Props {
  rooms: Room[];
  initialFilters?: {
    city?: string;
    state?: string;
    country?: string;
  };
}

const HomePage = ({ rooms, initialFilters: propsInitialFilters }: Props) => {
  const searchParams = useSearchParams();

  const initialFilters = propsInitialFilters || {
    city: searchParams.get("city") || "",
    state: searchParams.get("state") || "",
    country: searchParams.get("country") || "",
  };

  return (
    <>
      {/* <ToastContainer
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
      /> */}

      <SearchBarContainer initialFilters={initialFilters} />
      
      <div className="flex mx-auto">
        <div className="grid p-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto">
          {!rooms || rooms.length === 0 ? (
            <div className="min-h-screen">No rooms available</div>
          ) : (
            rooms.map((room) => <RoomCard key={room.roomId} room={room} />)
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;