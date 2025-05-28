"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const UpdateProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { data: session } = useSession();
  const previousMail = session?.user?.email;
  const previousName = session?.user?.name || "User's name not found";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          existingName: previousName,
          exisitingEmail: previousMail,
        }),
      });

      if (previousMail === email) {
        alert("Email already exists");
      }

      const apiData = await res.json();

      if (apiData.success) {
        alert(apiData.message);
        setEmail("");
        setName("");
      } else {
        alert(apiData.message);
      }
      console.log(apiData);
    } catch (error) {
      alert("An error occurred while submitting the form");
      console.log("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex m-20 justify-center  ">
        <div className="bg-white flex flex-col transform transition-all shadow-2xl border-2 p-6 w-[30vw] gap-4 rounded-2xl border-black">
          <h1 className="text-2xl font-semibold text-center">
            Update your Profile
          </h1>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <input
              className="p-2 border-2 focus:shadow-lg w-full rounded-md"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="p-2 border-2 focus:shadow-lg w-full rounded-md"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={IsLoading}
              className="p-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
              type="submit"
            >
              {IsLoading ? (<div className="flex justify-center mx-auto"><MoonLoader size={20} color="#ffffff"/> </div>) : 
              <p>
              Update Profile
              </p>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
