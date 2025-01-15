import React from 'react'
import Image from 'next/image'

const roomDetail = async () => {
  const res = await fetch("http://localhost:3000/api/rooms")
  return await res.json()
}

const RoomCard = async () => {

  const rooms = await roomDetail()
  console.log(rooms)

  return (
    <>
        <div className='p-4 flex flex-col gap-2 border-2 border-black rounded-lg h-80 m-4 w-72'>
            <div className="img w-full "> <Image src="/download.jpg" className='rounded-md' alt="123" width={500} height={200} /> </div>
            <br />
            <div className='flex flex-col gap-2'>
            <div className="roomName text-lg font-semibold">Room Name</div>
            <div className="roomPrice text-sm">$100/price</div>
            <button className="roomDetailButton p-2 rounded-md text-center border bg-purple-600 text-white font-semibold">View Details</button>
            </div>
        </div>
    </>
  )
}

export default RoomCard