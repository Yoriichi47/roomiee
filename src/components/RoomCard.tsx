import React from 'react'

const RoomCard = () => {
  return (
    <>
        <div className='p-4 flex flex-col gap-2 border-2 rounded-lg h-80 m-4 w-72'>
            <div className="img min-h-[60%] w-full border">Enter the image</div>
            <div className="roomName">Room Name</div>
            <div className="roomPrice">$100/price</div>
            <div className="roomDetailButton">View Details</div>
        </div>
    </>
  )
}

export default RoomCard