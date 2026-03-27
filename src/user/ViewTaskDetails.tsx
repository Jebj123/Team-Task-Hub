import React, { useState } from 'react'
import { ProjectCard } from '../Component/ProjectCard'
import type { Project } from '../types/types'


export const ViewTaskDetails = () => {
  const [project, setProject] = useState<Project[]>([]);
  return (
    <div className='border'>
      {project.map((proj) => (
        <div key={proj.id} className="flex flex-col items-start p-4 border rounded-lg bg-gray-100">
          <h2 className="text-xl font-bold mb-2">{proj.textTask}</h2>
        </div>
      ))}

    </div>
  )
}

export default ViewTaskDetails