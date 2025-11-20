import { getAllRooms } from "@/app/data/getAllRooms";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserRole, isAdmin } from "@/lib/auth-utils";
import { currentUser } from "@clerk/nextjs/server";

const HomePage = async ({city, state, country}: {city?: string, state?: string, country?: string}) => {

  const rooms = await getAllRooms({city, state, country});

  const role = await isAdmin()
  console.log("Role in HomePage:", role);

  const UserRole = await currentUser()
  console.log("User Role in HomePage:", UserRole?.publicMetadata?.role);

  const UserRoleUsingFunction = await getUserRole()
  console.log("User Role using getUserRole function in HomePage:", UserRoleUsingFunction);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 py-6 px-10">
        {rooms.length > 0 ? (
          rooms.map((room, i) => (
            <Card key={i} className="border-zinc-800 bg-zinc-800">
              <CardHeader className="space-y-4">
                <CardTitle className="w-full relative overflow-hidden">
                  <div className="w-full h-48 rounded-lg overflow-hidden relative">
                    <Image
                      src={
                        room.images?.length > 0 ? room.images[0] : "/images.jpg"
                      }
                      alt="Image description"
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw,
           (max-width: 1200px) 50vw,
           33vw"
                    />
                  </div>
                </CardTitle>
                <CardTitle>{room.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>${room.price}/night</CardDescription>
              </CardContent>
              <CardFooter >
                <Button
                  asChild
                  className="w-full bg-zinc-100 text-zinc-900 font-semibold text-lg"
                >
                  <Link href={`/rooms?roomId=${room.roomId}`}>See Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="flex justify-center w-screen"><p>No rooms available. Return to <Link className="underline font-semibold underline-offset-2 transition-all hover:underline-offset-4" href="/">Homepage.</Link></p></div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
