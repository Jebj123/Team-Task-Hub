import React, { useCallback, useEffect, useState } from "react";
import type { Project, Task } from "../../types/types"
import { InputField } from "../Field/InputField";
import { Checkbox } from "../../Shared/components/ui/checkBox";
import { Card } from "../../Shared/components/ui/card";


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
    const projectProgress = projectLength === 0 ? 0 : Math.round((completedProjects / projectLength) * 100);

    const taskLength = task.length;
    const completedTasks = task.filter((t) => t.isCompleted).length;
    const taskProgress = taskLength === 0 ? 0 : Math.round((completedTasks / taskLength) * 100);

    return(
    <div className="grid w-fullh-full justify-center items-center pl-20 pt-15">
    <div className="grid grid-cols-2 gap-2 items-center justify-center w-full pl-80 pb-10">
        <Card className="w-60 h-50 items-center justify-center gap-2">
            <h1 className="text-2xl text-center font-bold underline">Projects Completed</h1>
            <p className="text-2xl font-bold">{completedProjects}/{projectLength}</p>
            {projectProgress > 0 && (
                <div className="w-1/2 bg-red-400 rounded-full h-4 mb-4">
                    <div className="bg-green-400 h-4 rounded-full items-center flex justify-center" style={{ width: `${projectProgress}%` }}>{projectProgress}%</div>
                </div>
            )}
            {projectProgress === 100 && (
                <h3 className="text-green-500 font-bold ">Good job!</h3>
            )}
        </Card>
        <Card className="w-60 h-50 items-center justify-center gap-2">
            <h1 className="text-2xl font-bold underline text-center">Tasks Completed</h1>
            <p className="text-2xl font-bold">{completedTasks}/{taskLength}</p>
            {taskProgress > 0 && (
                <div className="w-1/2 bg-red-400 rounded-full h-4 mb-4">
                    <div className="bg-green-400 h-4 rounded-full items-center flex justify-center" style={{ width: `${taskProgress}%` }}>{taskProgress}%</div>
                </div>
            )}
            {taskProgress === 100 && (
                <h3 className="text-green-500 font-bold ">Good job!</h3>
            )}
        </Card>
    </div>
        <h1 className="flex  pb-10 text-5xl underline font-bold items-center justify-center">Project</h1>
        <div className="grid grid-cols-2 gap-2 pl-100 items-center justify-center w-full">
        <InputField  placeholder='Project Name' value={projectInput} onChange={(e) => {setProjectInput(e.target.value)}} />
        <button onClick={addProject} type='submit' className='gap-0 w-30 h-8 border rounded-sm transform transition duration-300 hover:scale-110' >Add Project</button>
        </div>
        <br/>
        <div className="">
        <br />
        <div className="grid grid-cols-1  border rounded-sm">
        <div className="flex justify-between border">
            <h1 className="text-2xl font-bold underline text-center pl-5">Project Details</h1><h2 className="text-2xl font-bold text-center underline pr-15">Project status</h2><h2 className="text-2xl font-bold text-center pr-8 underline">Delete Project</h2>
        </div>
        {project.map((proj) => (
            <div key={proj.id}>
            <li className="list-none border  p-2 bg-gray-50 h-20 items-center-safe justify-between flex hover:scale-101 hover:font-bold">
            <a href={`/user/task/${proj.id}`}>
                <h2 className="text-shadow-lg text-2xl w-50">{proj.textProject}</h2>
            </a>
            <div className="flex items-center gap-2 justify-between w-300">
            {proj.completed && <h3 className="text-green-500 font-bold w-50 pl-107">Completed</h3>} {!proj.completed && <h3 className="text-red-500 font-bold w-50 pl-107">In Progress</h3>}
                <button onClick={() => deleteProject(proj.id)} className=" border rounded-sm text-red-500 hover:bg-red-300 hover:scale-110 mr-10">Delete</button> 
            </div>
            </li>
            </div>
        ))}
      </div>
    </div>
    </div>
    )
};