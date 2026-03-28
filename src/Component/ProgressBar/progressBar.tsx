import React, { useEffect, useState } from 'react'
import type { Task } from '../../types/types';
import { useParams } from 'react-router-dom';

export const ProgressBar = () => {
    const { projectId } = useParams();
    const [task, setTasks] = useState<Task[]>(() =>{
            const storedTasks = localStorage.getItem("extendedTasks");
            return storedTasks ? JSON.parse(storedTasks) : [];
          });
         
          useEffect(() => {
              localStorage.setItem("extendedTasks", JSON.stringify(task));
          }, [task]);

    const tasksForSelectedProject = task.filter(
        (task) => task.projectId.toString() === projectId
        );
    function calculateProgress() {
        const completedTasks = tasksForSelectedProject.filter((t) => t.isCompleted).length;
        const totalTasks = tasksForSelectedProject.length;
        let progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
        return progress;
    }

    const progress = calculateProgress();
    console.log("Progress:", progress);
  return (
    <div className="w-1/6 bg-gray-200 rounded-full h-4 mb-4">
        <div className="bg-blue-500 h-4 rounded-full items-center flex justify-center" style={{ width: `${progress}%` }}>{progress}%</div>
    </div>
  )
}

export default ProgressBar