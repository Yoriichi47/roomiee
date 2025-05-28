import React from 'react'
import MoonLoader from 'react-spinners/MoonLoader'

const loading = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'><MoonLoader size={50}/></div>
  )
}

export default loading