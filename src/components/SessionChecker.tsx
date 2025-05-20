"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import MoonLoader from 'react-spinners/MoonLoader'

const SessionChecker = () => {

    const {data: session, status} = useSession()
  
    if(status === "loading"){
    return (
      <div className='m-2'>

      <MoonLoader size={20} />
      </div>
  )
  }

  const userImage = session?.user?.image

  return (
    <>
    {session ? <div className='p-2'>{userImage && (<img src={userImage} alt="User Profile" />)} Currently Logged in as: {session?.user?.email}</div>: <div>User Not Logged In</div>}
    </>
  )
}

export default SessionChecker