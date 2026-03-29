import React, { useEffect, useState } from 'react'
import type { Project, Task } from '../types/types';
import { ProjectDetailCard } from '../Component/projectDetailCard';
import { InputField } from '../Component/Field/InputField';
import { useParams } from 'react-router-dom';
import { Checkbox } from "../components/ui/checkBox";


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

        const isProjectCompleted = tasksForSelectedProject.length > 0 && tasksForSelectedProject.every((t) => t.isCompleted === true);

        const filteredProject = project.find((p) => p.id.toString() === projectId);

        useEffect(() => {
            if (!filteredProject) return;
            const updatedProjects = project.map((p) =>
                p.id.toString() === projectId ? { ...p, completed: isProjectCompleted } : p
            );
            setProjects(updatedProjects);
            localStorage.setItem("project", JSON.stringify(updatedProjects));
        }, [isProjectCompleted, projectId]);
    
        const completedTasks = tasksForSelectedProject.filter((t) => t.isCompleted).length;
        const totalTasks = tasksForSelectedProject.length;
        const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);


  return (
    <div className="grid max-w-full h-full justify-center items-center pl-1">
        <div className="flex list-none border rounded-sm p-2 bg-gray-200  h-20 justify-between items-center scale-102">
        <ProjectDetailCard/>
    <div className="grid grid-cols-1 items-end">
        {progress > 0 && (
            <div className="w-1/2 bg-white rounded-full h-4 mb-4 justify-start items-center flex">
                <div className="bg-blue-500 h-4 rounded-full items-center flex justify-center" style={{ width: `${progress}%` }}>{progress}%</div>
            </div>
        )}
        {completedTasks === totalTasks && totalTasks > 0 ? (
            <h3 className="text-green-500 font-bold w-50 pl-2">Completed</h3>
        ) : (
            <h3 className="text-red-500 font-bold w-50 pl-2">In Progress</h3>
        )}
        </div>
        </div>
        <div className="pt-10">
        </div>
        <div className='flex gap-10'>
        <InputField placeholder='Task Name' value={taskInput} onChange={(e) => {setTaskInput(e.target.value)}} />
        <button onClick={addTask} type='submit' className='w-30 h-8 border rounded-sm transform transition duration-300 hover:scale-110' >Add Task</button>
        </div>
        <br />
        <div className="grid grid-cols-1 gap-5 w-auto">
        {tasksForSelectedProject.map((t) => (
            <div key={t.taskId}>
            <li className=" flex list-none border rounded-sm p-2 bg-indigo-50 w-300 h-20 min-w-auto justify-between items-center ">
            <span className='text-xl'>{t.textTask}</span>
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