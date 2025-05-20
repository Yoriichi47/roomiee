import UserOptions from '@/components/UserOptions'
import React from 'react'

interface props{
    children: React.ReactNode
}

const userLayout = ({children}: props) => {
  return (
    <>
    <div className='flex justify-center my-2'>
        <h1 className='font-bold m-2 text-4xl'>User Settings</h1>
    </div>
    <div className='flex'>
<div className='w-1/5 border-2 border-green-400'> <UserOptions /></div>
    <div className='w-4/5 border-2 border-red-400'>{children}</div>
    </div>
    </>
  )
}

export default userLayout