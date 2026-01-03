import React from 'react'
import { Spinner } from "@/components/ui/spinner"

const loading = () => {
  return (
    <div className="flex justify-center min-w-full items-center min-h-screen "><Spinner className='size-16' /></div>
  )
}

export default loading