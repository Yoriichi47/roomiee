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

  return (
    <>
    {session ? <div className='p-2'>Currently Logged in as: {session?.user?.email}</div>: <div>User Not Logged In</div>}
    </>
  )
}

export default SessionChecker