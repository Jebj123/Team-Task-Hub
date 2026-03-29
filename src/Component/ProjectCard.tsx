import React, { useCallback, useEffect, useState } from "react";
import type { Project, Task } from "../types/types"
import { InputField } from "./Field/InputField";
import { Checkbox } from "../components/ui/checkBox";
import { Card } from "../components/ui/card";


export function ProjectCard() {
    const [project, setProject] = useState<Project[]>(() =>{
        const storedProjects = localStorage.getItem("project");
        if (storedProjects) {
        return storedProjects ? JSON.parse(storedProjects) : [];
        }
    });
    const [task, setTasks] = useState<Task[]>(() =>{
            const storedTasks = localStorage.getItem("extendedTasks");
            return storedTasks ? JSON.parse(storedTasks) : [];
          });
         
          useEffect(() => {
              localStorage.setItem("extendedTasks", JSON.stringify(task));
    }, [task]);

    
    useEffect(() => {
        localStorage.setItem("project", JSON.stringify(project));
    }, [project]);
    
    const [projectInput, setProjectInput] = useState("");


    const addProject =  (e) => {
        e.preventDefault();


        if (!projectInput || projectInput === "") {
            window.alert("Please enter a project name.");
        }
        if (projectInput.trim()) {
            const newProject = {
                id: Date.now(),
                textProject: projectInput,
                completed: false,
                extendedTasks: [],
            };

        localStorage.setItem("project", JSON.stringify(newProject));
        setProject([...project, newProject]);
        setProjectInput("");
        }
    }

    // eyða verkefni
    const deleteProject = (id: number) => {
        const updatedProjects = project.filter((proj) => proj.id !== id);
        setProject(updatedProjects);
        localStorage.setItem("project", JSON.stringify(updatedProjects));
    };

    const projectLength = project.length;
    const completedProjects = project.filter((proj) => proj.completed).length;
    const projectProgress = projectLength === 0 ? 0 : (completedProjects / projectLength) * 100;

    const taskLength = task.length;
    const completedTasks = task.filter((t) => t.isCompleted).length;
    const taskProgress = taskLength === 0 ? 0 : (completedTasks / taskLength) * 100;

    return(
    <div className="grid max-w-full h-full justify-center items-center ">
    <div className="grid grid-cols-2 gap-2 items-center justify-center w-full pl-80 pb-10">
        <Card className="w-50 h-40 items-center justify-center gap-2">
            <h1 className="text-2xl pl-10 font-bold underline">Projects Completed</h1>
            <p className="text-2xl font-bold">{completedProjects}/{projectLength}</p>
            {projectProgress > 0 && (
                <div className="w-1/2 bg-red-400 rounded-full h-4 mb-4">
                    <div className="bg-green-400 h-4 rounded-full items-center flex justify-center" style={{ width: `${projectProgress}%` }}>{projectProgress}%</div>
                </div>
            )}
        </Card>
        <Card className="w-50 h-40 items-center justify-center gap-2">
            <h1 className="text-2xl pl-10 font-bold underline">Tasks Completed</h1>
            <p className="text-2xl font-bold">{completedTasks}/{taskLength}</p>
            {taskProgress > 0 && (
                <div className="w-1/2 bg-red-400 rounded-full h-4 mb-4">
                    <div className="bg-green-400 h-4 rounded-full items-center flex justify-center" style={{ width: `${taskProgress}%` }}>{taskProgress.toFixed()}%</div>
                </div>
            )}
        </Card>
    </div>
        <h1 className="flex  pb-10 text-5xl underline font-bold items-center justify-center">My Projects</h1>
        <div className="grid grid-cols-2 gap-2 pl-100 items-center justify-center w-full">
        <InputField  placeholder='Project Name' value={projectInput} onChange={(e) => {setProjectInput(e.target.value)}} />
        <button onClick={addProject} type='submit' className='gap-0 w-30 h-8 border rounded-sm transform transition duration-300 hover:scale-110' >Add Project</button>
        </div>
        <br/>
        <div className="">
        <br />
        <div className="grid grid-cols-1 gap-5">
        {project.map((proj) => (
            <div key={proj.id}>
            <li className="list-none border rounded-sm p-2 bg-indigo-50 h-20 items-center-safe justify-between flex hover:scale-102 ">
            <a href={`/user/task/${proj.id}`}>
                <h2 className="text-shadow-lg text-3xl w-50">{proj.textProject}</h2>
            </a>
            <div className="flex items-center gap-2 justify-between w-300">
            <Checkbox className="w-5 h-5 border rounded-sm"  disabled checked={proj.completed} onCheckedChange={() => {
                const updatedProjects = project.map((p) => 
                    p.id === proj.id ? { ...p, completed: !p.completed } : p
                );
                setProject(updatedProjects);
                localStorage.setItem("project", JSON.stringify(updatedProjects));
            }} />
            {proj.completed && <h3 className="text-green-500 font-bold w-50">Completed</h3>} {!proj.completed && <h3 className="text-red-500 font-bold w-50">In Progress</h3>}
                <button onClick={() => deleteProject(proj.id)} className=" border rounded-sm text-red-500 hover:bg-red-300 hover:scale-110 ml-30">Delete</button> 
            </div>
            </li>
            </div>
        ))}
      </div>
    </div>
    </div>
    )
};