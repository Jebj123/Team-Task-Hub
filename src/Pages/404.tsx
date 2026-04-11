import React from 'react'
import CogWheel from '../assets/cogwheel.png'

const NotFound = () => {
  return (
    <div className='flex justify-center items-center'>
        <div className='flex flex-col items-center mt-20'>
        <h1 className='text-4xl font-bold text-gray-800'>404 - Page Not Found</h1>
        <img src={CogWheel} alt="Not Found" className='w-64 h-64 mt-4 animate-spin [animation-duration:3s]'/>
        </div>
    </div>
  )
}

export default NotFound