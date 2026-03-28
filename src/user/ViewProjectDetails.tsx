import React, { useEffect, useState } from 'react'
import type { Project, Task } from '../types/types';
import { ProjectDetailCard } from '../Component/projectDetailCard';
import { InputField } from '../Component/Field/InputField';
import { Button } from '../components/ui/button';
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
      
      const [project, setProject] = useState<Project[]>(() =>{
              const storedProjects = localStorage.getItem("project");
              if (storedProjects) {
              return storedProjects ? JSON.parse(storedProjects) : [];
              }
          });
      
          useEffect(() => {
              localStorage.setItem("project", JSON.stringify(project));
          }, [project]);

      const { projectId } = useParams();

      const[selectedProject, setSelectedProject] = useState(projectId);
  
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
  return (
    <div className="grid ">
        <ProjectDetailCard />
        <InputField className='' placeholder='Task Name' value={taskInput} onChange={(e) => {setTaskInput(e.target.value)}} />
        <button onClick={addTask} type='submit' className='w-30 h-8 border rounded-sm transform transition duration-300 hover:scale-110' >Add Task</button>
        <br />
        <div className="grid grid-cols-1 gap-5">
        {tasksForSelectedProject.map((t) => (
            <div key={t.taskId}>
            <li className=" flex list-none border rounded-sm p-2 bg-gray-200 w-1/2 h-15 justify-between items-center ">
            <span>{t.textTask}</span>
            <div className="grid grid-cols-2 gap-2">
                <Checkbox className="bg-white h-5 w-5" onClick={() => toggleTask(t.taskId)}>
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