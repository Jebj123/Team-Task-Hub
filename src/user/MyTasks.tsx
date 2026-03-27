import React from 'react'

const Mytasks = () => {
  return (
    <div className='flex flex-row w-full pl-40 gap-10 justify-center items-center'>
      <input type='text' className='border rounded-sm p-3 w-1/2 h-15 text-4xl'/>
      <button type='submit' className='border w-50 h-15 rounded-2xl ml-1.5 transform transition duration-300 hover:scale-110' >Add Task</button>
    </div>

    
  )
}

export default Mytasks