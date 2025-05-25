"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signinAction } from "@/signinAction";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const {data: session, status} = useSession()

  useEffect(() => {

    if(status === "authenticated"){
      alert("You are logged in")
      router.push("/")
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // const res = await signIn("credentials", {
    //   redirect: false,
    //   email,
    //   password,
    // });

    // if (res?.error) {
    //   setError("Invalid email or password");
    // } else {
    //   router.push("/");
    // }

    const data = await signinAction(email, password)

    if (!data?.success) {
      setError(data?.message || "An unknown error occurred");
    } else {
      alert("You are logged in");
      router.push("/");
    }

  };

  return (
    <>
      <div className="bg-gray-100 flex justify-center m-10 ">
        <div className="bg-white flex flex-col transform transition-all shadow-2xl border-2 p-6 w-[30vw] gap-4 rounded-2xl border-black">
          <h1 className="text-3xl font-bold text-center">Sign In</h1>

          {error && (
            <p className="text-red-600 text-center text-sm flex items-center justify-center gap-2">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <input
              className="p-2 border-2 focus:shadow-lg w-full rounded-md"
              required
              name="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-2 border-2 focus:shadow-lg w-full rounded-md"
              required
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="p-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
              type="submit"
            >
              Sign In
            </button>
          </form>

          <div className="flex justify-around items-center">
            <div className="LeftLine h-[2px] bg-gray-400 w-full"> </div>
            <p className="text-sm font-semibold mx-2">OR</p>
            <div className="RightLine h-[2px] bg-gray-400 w-full"> </div>
          </div>
          <button className="p-2 bg-white text-black rounded-md hover:bg-gray-100 border-2 border-black transition-colors">
            <Link href={"/signup"}>Sign Up</Link>
          </button>
          <Link href="/forgotpassword" className="text-right text-sm underline">Forgot Password?</Link>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
