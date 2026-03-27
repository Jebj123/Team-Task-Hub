import React from 'react'
import { ProjectCard } from '../Component/ProjectCard'
import { InputField } from '../Component/Field/InputField'


const MyProject = () => {
  return (
    <div >
      <div className='grid grid-cols-1 justify-center items-center'>
        <br />
        <ProjectCard />
      </div>
    </div>

    
  )
}

export default MyProject