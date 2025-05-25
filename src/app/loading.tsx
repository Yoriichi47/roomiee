import React from 'react'
import MoonLoader from 'react-spinners/MoonLoader'

const loading = () => {
  return (
    <div className='flex t-0 relative justify-center items-center mt-10'><MoonLoader  size={30}/></div>
  )
}

export default loading