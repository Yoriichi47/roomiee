"use client"
import { auth } from '@/auth'
import { useSession } from 'next-auth/react'
import React from 'react'

const SessionChecker = () => {

    const {data: session} = useSession()

  return (
    <div className='p-2'>Currently Logged in as: {session?.user?.name || session?.user?.email}</div>
  )
}

export default SessionChecker