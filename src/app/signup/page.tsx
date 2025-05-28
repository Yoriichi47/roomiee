"use client";
import { useSession } from "next-auth/react";
import { signUp } from "@/signupAction";
import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import MoonLoader from "react-spinners/MoonLoader";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  const [OriginalPassword, setOriginalPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [email, setEmail] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (OriginalPassword !== matchPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const res = await signUp(email, OriginalPassword);

      if (res.success) {
        alert(res.message);
        redirect("/signin");
      } else if (res.message === "User already exists") {
        alert(res.message);
        redirect("/signin");
      } else {
        alert(res.message);
      }
    } catch (error) {
      if (error instanceof Error) alert("Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-center m-10">
        <div className="bg-white flex flex-col transform transition-all shadow-2xl border-2 p-6 w-[30vw] gap-4 rounded-2xl border-black">
          <div className="text-center ">
            <h1 className="text-3xl font-bold">Create an Account</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-4">
              <div className="">
                <input
                  className="p-2 border-2 focus:shadow-lg w-full rounded-md"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <div className="">
                <input
                  className="p-2 border-2 focus:shadow-lg w-full rounded-md"
                  required
                  type="password"
                  value={OriginalPassword}
                  onChange={(e) => setOriginalPassword(e.target.value)}
                  placeholder="Enter your Password"
                  name="password"
                />
              </div>
              <div className="">
                <input
                  className="p-2 border-2 focus:shadow-lg w-full rounded-md"
                  required
                  type="password"
                  value={matchPassword}
                  onChange={(e) => setMatchPassword(e.target.value)}
                  placeholder="Re-enter your Password"
                  name="matchPassword"
                />
              </div>
              <button disabled={IsLoading}
                className="p-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
                type="submit"
              >
                {IsLoading ? (
                  <div className="flex justify-center mx-auto">
                    <MoonLoader size={20} color="#ffffff" />{" "}
                  </div>
                ) : (
                  <p>Sign Up</p>
                )}
              </button>
            </div>
          </form>
          <div className="flex justify-around items-center">
            <div className="LeftLine h-[2px] bg-gray-400 w-full"> </div>
            <p className="text-sm font-semibold mx-2">OR</p>
            <div className="RightLine h-[2px] bg-gray-400 w-full"> </div>
          </div>
          <button className="p-2 bg-white text-black rounded-md hover:bg-gray-100 border-2 border-black transition-colors">
            <Link href={"/signin"}>Sign in</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
