import React from 'react'
import Header from '../../components/Header'
import { UserProfile } from '@clerk/nextjs'

const page = () => {
  return (
    <>
    <Header />
    <div className="flex pt-20 justify-center">
    <UserProfile />
    </div>
    </>
  )
}

export default page