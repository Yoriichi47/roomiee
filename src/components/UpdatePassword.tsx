"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const UpdatePassword = () => {
  const { data: session } = useSession();

  const exisitingEmail = session?.user?.email;

  const [Password, setPassword] = useState("");
  const [PasswordAgain, setPasswordAgain] = useState("");
  const [Show, setShow] = useState(false);
  const [ShowAgain, setShowAgain] = useState(false);

  const showPassword = () => {
    setShow(!Show);
  };

  const showPasswordAgain = () => {
    setShowAgain(!ShowAgain);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Password !== PasswordAgain) {
      alert("The passwords do no match");
    }

    if (Password !== "") {
      try {
        const res = await fetch("/api/user/password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: Password,
            passwordAgain: PasswordAgain,
            email: exisitingEmail,
          }),
        });
        const apiData = await res.json();

        if (apiData.success) {
          alert(apiData.message);
          setPassword("");
          setPasswordAgain("");
        }
        alert(apiData.message);
      } catch (error) {
        if (error instanceof Error) {
          error.message;
        }
      }
    } else if (Password === "" || PasswordAgain === "") {
      alert("Password fields can't be empty");
    } 
  };
  return (
    <>
      <div className="bg-gray-100 flex m-20 justify-center  ">
        <div className="bg-white flex flex-col transform transition-all shadow-2xl border-2 p-6 w-[30vw] gap-4 rounded-2xl border-black">
          <h1 className="text-2xl font-semibold text-center">
            Update your Password
          </h1>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <div className="flex">
              <input
                className="p-2 border-2 border-r-0 focus:shadow-lg w-full rounded-l-md"
                type={Show ? "text" : "password"}
                placeholder="Enter your Password"
                name="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="p-2 border-2 focus:shadow-lg rounded-r-md focus:border-black hover:bg-gray-50 transition-all"
                onClick={showPassword}
              >
                {Show ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <div className="flex">
              <input
                className="p-2 border-2 border-r-0 focus:shadow-lg w-full rounded-l-md"
                type={ShowAgain ? "text" : "password"}
                placeholder="Enter your Password"
                name="passwordAgain"
                value={PasswordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
              />
              <button
                type="button"
                className="p-2 border-2 focus:shadow-lg rounded-r-md hover:bg-gray-50 transition-all"
                onClick={showPasswordAgain}
              >
                {ShowAgain ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <button
              className="p-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
