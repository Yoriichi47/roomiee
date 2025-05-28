"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import MoonLoader from "react-spinners/MoonLoader";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [Show, setShow] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      alert("You are logged in");
      router.push("/");
    }
  }, [status, router]);

  const showPassword = () => {
    setShow(!Show);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);

      const data = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (data?.error) {
        const errorMessage =
          typeof data.error === "string"
            ? data.error
            : (data.error as any)?.message || "Unexpected error";

        if (errorMessage === "CredentialsSignin") {
          setError("Invalid email or password");
        } else {
          setError(errorMessage);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
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
            <div className="flex">
              <input
                className="p-2 border-2 border-r-0 focus:border-r-2 rounded-r-none focus:shadow-lg w-full rounded-l-md"
                type={Show ? "text" : "password"}
                placeholder="Enter your Password"
                name="password"
                value={password}
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
            <button disabled={IsLoading}
              className="p-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
              type="submit"
            >
              {IsLoading ? (<div className="flex justify-center mx-auto"><MoonLoader size={20} color="#ffffff"/> </div>) : <p>Sign In</p>}
            </button>
          </form>

          <div className="flex justify-around items-center">
            <div className="LeftLine h-[2px] bg-gray-400 w-full"> </div>
            <p className="text-sm font-semibold mx-2">OR</p>
            <div className="RightLine h-[2px] bg-gray-400 w-full"> </div>
          </div>
          <button  className="p-2 bg-white text-black rounded-md hover:bg-gray-100 border-2 border-black transition-colors">
            <Link href={"/signup"}>Sign Up</Link>
          </button>
          <Link
            href="/forgot_password"
            className="text-right text-sm underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
