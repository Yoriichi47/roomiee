"use client";
import React from "react";
import Header from "../components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    redirect('/sign-in');
  }

  const userRole = user.publicMetadata?.role as string | undefined;
  const isAdmin = userRole === "adminrole";
  console.log("User Role:", userRole);

  if (!isAdmin) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-md bg-zinc-800 border-zinc-700 text-zinc-100">
            <CardHeader className="text-center">
              <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">You don&apos;t have admin permissions.</p>
              <Button onClick={() => redirect('/')} className="bg-zinc-700">
                Go Back Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-start min-h-screen">
        <Card className="mt-10 w-full max-w-4xl bg-zinc-800 border-zinc-800 text-zinc-100">
          <CardHeader className="text-center text-4xl underline underline-offset-2 font-bold">
            Admin 
          </CardHeader>

          <CardContent className="flex pl-0">
            {/* Sidebar */}
            <div className="flex gap-2 flex-col w-1/4">
              <Link href="/admin/dashboard">
                <Button 
                  className={`w-full text-lg hover:bg-zinc-900 focus:bg-zinc-900 font-semibold rounded-none ${
                    pathname === "/admin/dashboard" ? "bg-zinc-900 underline underline-offset-2" : ""
                  }`}
                >
                  Dashboard
                </Button>
              </Link>

              <Link href="/admin/rooms">
                <Button 
                  className={`w-full text-lg hover:bg-zinc-900 focus:bg-zinc-900 font-semibold rounded-none ${
                    pathname === "/admin/rooms" ? "bg-zinc-900 underline underline-offset-2" : ""
                  }`}
                >
                  Rooms
                </Button>
              </Link>

              <Link href="/admin/bookings">
                <Button 
                  className={`w-full text-lg hover:bg-zinc-900 focus:bg-zinc-900 font-semibold rounded-none ${
                    pathname === "/admin/bookings" ? "bg-zinc-900 underline underline-offset-2" : ""
                  }`}
                >
                  Bookings
                </Button>
              </Link>
            </div>

            {/* Main Content */}
            <div className="w-full">
              {children}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}