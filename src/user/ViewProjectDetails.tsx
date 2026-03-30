import React, { useEffect, useState } from 'react'
import type { Project, Task } from '../types/types';
import { ProjectDetailCard } from '../Component/Cards/projectDetailCard';
import { InputField } from '../Component/Field/InputField';
import { useParams } from 'react-router-dom';
import { Checkbox } from "../Shared/components/ui/checkBox";
import { Card } from '../Shared/components/ui/card';
import { Button } from '../Shared/components/ui/button';
import { set } from 'zod';
import { SelectField } from '../Component/Field/SelectField';


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
      const [fieldInput, setFieldInput] = useState("");

      const [filterImportance, setFilterImportance] = useState("");
      const[searchTerm, setSearchTerm] = useState("");
      const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);

      useEffect(() => {
          setDisplayedTasks(tasksForSelectedProject);
      }, [task]);
     
  
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
                  taskImportance: fieldInput,
                  extendedTasks: [taskInput],
              };
          localStorage.setItem("extendedTasks", JSON.stringify([...task, newTask]));
          setTasks([...task, newTask]);
          setTaskInput("");
          }
      }
      const sortHighToLow = () => {
        const importanceOrder: Record<"low" | "medium" | "high", number> = {
            low: 1,
            medium: 2,
            high: 3,
        };

        const getImportanceRank = (importance: string) =>
            importanceOrder[importance as keyof typeof importanceOrder] ?? 0;

        const sortedTasks = [...tasksForSelectedProject].sort(
            (a, b) => getImportanceRank(b.taskImportance) - getImportanceRank(a.taskImportance)
        );

        setDisplayedTasks(sortedTasks);
    };

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

        const searchTasks = (textTask: string) => {
            if (!textTask.trim()) {
                setDisplayedTasks(tasksForSelectedProject);
                return;
            }
            const filteredTasks = task.filter((t) =>
                t.textTask.toLowerCase().includes(textTask.toLowerCase()) &&
                t.projectId.toString() === projectId
            );
            setDisplayedTasks(filteredTasks);
            setSearchTerm("");
        };   
        const filterbyImportance = (importance: string) => {
        setFilterImportance(importance);
        if (importance === "All") {
            setDisplayedTasks(tasksForSelectedProject);
            return;
        }
        const filteredTasks = tasksForSelectedProject.filter((t) =>
            t.taskImportance.toLowerCase() === importance.toLowerCase()
        );
        setDisplayedTasks(filteredTasks);
    };


  return (
    <div className="grid w-full h-full justify-center items-center pl-30 pt-7">
        <div className="grid grid-col-1 pb-10 w-1/2 ml-200 gap-2">
    <h3 className="text-1xl font-bold ">Search Tasks:</h3>
    <div className="grid grid-cols-2 gap-3">
    <InputField placeholder="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    <Button className="w-30 h-8 border-  transform transition duration-300 hover:scale-110 mt-1" onClick={() => searchTasks(searchTerm)}>Search</Button>
    </div>
    </div>
        <div className='flex items-center justify-center pb-10'>
        <Card className="w-60 h-50 items-center justify-center gap-2">
            <h1 className="text-2xl text-center font-bold underline">Tasks Completed</h1>
            <p className="text-2xl font-bold">{completedTasks}/{totalTasks}</p>
            {progress > 0 && (
                <div className="w-1/2 bg-red-400 rounded-full h-4 mb-4">
                    <div className="bg-green-400 h-4 rounded-full items-center flex justify-center " style={{ width: `${progress}%` }}>{progress}%</div>
                </div>
            )}
            {progress === 100 && (
                <h3 className="text-green-500 font-bold ">Good job!</h3>
            )}
        </Card>
    </div>
        <div className="flex list-none border-4 rounded-sm p-2 bg-gray-50  h-20 justify-between items-center ">
        <ProjectDetailCard/>
    <div className="grid grid-cols-1 items-end">
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
        <div className="flex justify-end gap-2 pr-20">
        <h1 className="text-1xl font-bold">Filter by importance:</h1>
        {(["All", "High", "Medium", "Low"] as const).map((level) => (
            <Button
                key={level}
                variant={filterImportance === level || (level === "All" && !filterImportance) ? "default" : "outline"}
                onClick={() => filterbyImportance(level)}
                className="selection:bg-gray-400"
            >
                {level}
            </Button>
        ))}
        </div>
        </div>
        <br />
        <div className="grid grid-cols-1 border-2 rounded-sm w-auto">
        <div className='flex justify-between mr-15'>
        <h1 className='text-2xl font-bold underline pl-5'>Tasks</h1><h1 className='text-2xl font-bold underline pl-90' onClick={sortHighToLow}>Importance</h1><h1 className='text-2xl font-bold underline pl-50'>Status</h1><h1 className='text-2xl font-bold underline'>delete</h1>
        </div>
        {displayedTasks.map((t) => (
            <div key={t.taskId}>
            <li className=" flex list-none border  p-2 bg-gray-50 w-full h-20 justify-between items-center hover:font-bold ">
            <span className='text-xl w-50'>{t.textTask}</span>
            <div>
            <SelectField placeholder="Select Importance" value={t.taskImportance} onChange={(value) => {
                            const updatedTasks = task.map((taskItem) => {
                                if (taskItem.taskId === t.taskId) {
                                    return { ...taskItem, taskImportance: value };
                                }
                                return taskItem;
                            });
                            setTasks(updatedTasks);
                        }} />
                        </div>
            <div className="grid grid-cols-2 gap-2">
                <Checkbox className="bg-white h-5 w-5 text-green-800 border-black hover:scale-105" onClick={() => toggleTask(t.taskId)} checked={t.isCompleted}>
                </Checkbox>
                <button onClick={() => deleteTask(t.taskId)} className='text-red-500 w-20 h-8 border rounded-sm transform transition duration-300 hover:scale-110 mr-10'>Delete</button>
            </div>
            </li>
            </div>
        ))}
        </div>
    </div>
  )
}

export default ViewProjectDetails