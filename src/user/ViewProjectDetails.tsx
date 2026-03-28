import React, { useEffect, useState } from 'react'
import type { Project, Task } from '../types/types';
import { ProjectDetailCard } from '../Component/projectDetailCard';
import { InputField } from '../Component/Field/InputField';
import { useParams } from 'react-router-dom';
import { Checkbox } from "../components/ui/checkBox";
import { set } from 'zod';

export const ViewProjectDetails = () => {
    const [task, setTasks] = useState<Task[]>(() =>{
        const storedTasks = localStorage.getItem("extendedTasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
      });
     
      useEffect(() => {
          localStorage.setItem("extendedTasks", JSON.stringify(task));
      }, [task]);
      
      const [project, setProjects] = useState<Project[]>(() =>{
              const storedProjects = localStorage.getItem("project");
              if (storedProjects) {
              return storedProjects ? JSON.parse(storedProjects) : [];
              }
          });
      
          useEffect(() => {
              localStorage.setItem("project", JSON.stringify(project));
          }, [project]);

      const { projectId } = useParams();

      const [taskInput, setTaskInput] = useState("");
     
  
      const addTask =  (e) => {
          e.preventDefault();
  
          if (!taskInput || taskInput === null) {
                window.alert("Please enter a task.");
          }
          if (taskInput) {
              const newTask = {
                  taskId: Date.now(),
                  textTask: taskInput,
                  projectId : projectId,
                  isCompleted: false,
                  extendedTasks: [taskInput],
              };
          localStorage.setItem("extendedTasks", JSON.stringify([...task, newTask]));
          setTasks([...task, newTask]);
          setTaskInput("");
          }
      }

      // eyða verkefni
      const deleteTask = (taskId: number) => {
          const updatedTasks = task.filter((t) => t.taskId !== taskId);
          setTasks(updatedTasks);
          localStorage.setItem("extendedTasks", JSON.stringify(updatedTasks));
      };
  
      //toggle verkefni
      const toggleTask = (taskId: number) => {
          const updatedTasks = task.map((t) => 
              t.taskId === taskId ? { ...t, isCompleted: !t.isCompleted } : t
          );
          setTasks(updatedTasks);
          localStorage.setItem("extendedTasks", JSON.stringify(updatedTasks));
      };

        const tasksForSelectedProject = task.filter(
        (task) => task.projectId.toString() === projectId
        );

        const completedTasks = tasksForSelectedProject.filter((t) => t.isCompleted).length;
        const totalTasks = tasksForSelectedProject.length;
        let progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);



  return (
    <div className="grid gap-5">
        <div className="flex list-none border rounded-sm p-2 bg-gray-200 w-1/2 h-15 justify-between items-center ">
        <ProjectDetailCard />
        {progress > 0 && (
            <div className="w-1/6 bg-gray-200 rounded-full h-4 mb-4">
                <div className="bg-blue-500 h-4 rounded-full items-center flex justify-center" style={{ width: `${progress}%` }}>{progress}%</div>
            </div>
        )}
        </div>
        <InputField className='' placeholder='Task Name' value={taskInput} onChange={(e) => {setTaskInput(e.target.value)}} />
        <button onClick={addTask} type='submit' className='w-30 h-8 border rounded-sm transform transition duration-300 hover:scale-110' >Add Task</button>
        <br />
        <div className="grid grid-cols-1 gap-5">
        {tasksForSelectedProject.map((t) => (
            <div key={t.taskId}>
            <li className=" flex list-none border rounded-sm p-2 bg-gray-200 w-1/2 h-15 justify-between items-center ">
            <span>{t.textTask}</span>
            <div className="grid grid-cols-2 gap-2">
                <Checkbox className="bg-white h-5 w-5" onClick={() => toggleTask(t.taskId)} checked={t.isCompleted}>
                </Checkbox>
                <button onClick={() => deleteTask(t.taskId)} className='w-20 h-8 border rounded-sm transform transition duration-300 hover:scale-110'>Delete</button>
            </div>
            </li>
            </div>
        ))}
        </div>
    </div>
  )
}

export default ViewProjectDetails