"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import MoonLoader from "react-spinners/MoonLoader";

const UpdatePicture = () => {
  const { data: session } = useSession();

  const exisitingEmail = session?.user?.email;

  const [UserPicture, setUserPicture] = useState("");
  const [IsLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true)

      const res = await fetch("/api/user/picture", {
        method: "PUT",
        headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        picture: UserPicture,
        email: exisitingEmail,
      }),
    });

    const apiData = await res.json();
    console.log(apiData);
    if (apiData.success) {
      alert("Picture updated successfully");
    } else {
      alert("Failed to update picture");
    }
      } catch (error) {
        if(error instanceof Error){
          alert("Some error occurred")
        }
      } finally {
        setIsLoading(false)
      }
  };

  return (
    <>
      <div className="bg-gray-100 flex m-20 justify-center  ">
        <div className="bg-white flex flex-col transform transition-all shadow-2xl border-2 p-6 w-[30vw] gap-4 rounded-2xl border-black">
          <h1 className="lg:text-3xl md:text-2xl font-semibold text-center">
            Update your Picture
          </h1>

          <form onSubmit={handleSubmit} className="flex mt-5 w-full flex-col gap-4">
            <div className="flex mx-auto">
              <input
              className="w-4/5 lg:text-base md:text-xs"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setUserPicture(reader.result as string); // base64 string
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <button
              className="p-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
              type="submit" disabled={IsLoading}
            >{IsLoading ? (<div className="flex justify-center mx-auto"><MoonLoader size={20} color="#ffffff"/> </div>) : 
              <p>
              Upload
              </p>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePicture;
