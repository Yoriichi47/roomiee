"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const UpdatePicture = () => {
  const { data: session } = useSession();

  const exisitingEmail = session?.user?.email;

  const [UserPicture, setUserPicture] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
  };

  return (
    <>
      <div className="bg-gray-100 flex m-20 justify-center  ">
        <div className="bg-white flex flex-col transform transition-all shadow-2xl border-2 p-6 w-[30vw] gap-4 rounded-2xl border-black">
          <h1 className="text-2xl font-semibold text-center">
            Update your Picture
          </h1>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <div className="flex">
              <input
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
              type="submit"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePicture;
