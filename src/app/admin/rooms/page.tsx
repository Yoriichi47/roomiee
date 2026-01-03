import { getRoomsByAdmin } from '@/app/data/getRoomsByAdmin';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Delete, Pen, Plus } from 'lucide-react';

const page = async () => {

  const roomsByAdmin = (await getRoomsByAdmin()).data;



  return (
    <Card className="bg-zinc-700 rounded-l-none w-full border-zinc-700">
      <CardHeader className="text-center text-2xl underline underline-offset-1 font-semibold">Rooms</CardHeader>
      <div className='flex justify-end px-6'>
        <Button asChild className='bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-lg'>
          <Link href="/admin/rooms/create" className='font-semibold'><Plus /> Create New Room</Link>
        </Button>
      </div>      
      <CardContent className='grid grid-cols-1 lg:grid-cols-2 gap-6 py-6 px-10'>
        {roomsByAdmin.length > 0 ? (
          roomsByAdmin.map((room, i) => (
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
              <CardFooter className='flex-col gap-2' >
                <Button
                  asChild
                  className="w-full bg-zinc-100 text-zinc-900 font-semibold text-lg"
                >
                  <Link href={`/rooms?roomId=${room.roomId}`}>See Details</Link>
                </Button> 
                <div className="flex gap-2 w-full">

                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-zinc-900 font-semibold text-lg"
                >
                  <Link href={`/admin/rooms/update?roomId=${room.roomId}`}><Pen /> Edit</Link>
                </Button> 
                <Button
                  asChild
                  className="w-full bg-red-600 hover:bg-red-700 text-zinc-900 font-semibold text-lg"
                >
                  <Link href={`/admin/rooms/delete?roomId=${room.roomId}`}><Delete /> Delete</Link>
                </Button> 
                  </div>
              </CardFooter>
            </Card>
          ))
        ) : (<p>No rooms found.</p>)}
      </CardContent>
    </Card>
  );
};

export default page