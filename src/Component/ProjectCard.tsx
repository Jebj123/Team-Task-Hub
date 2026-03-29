import React, { useCallback, useEffect, useState } from "react";
import type { Project, Task } from "../types/types"
import { InputField } from "./Field/InputField";
import { Checkbox } from "../components/ui/checkBox";


export function ProjectCard() {
    const [project, setProject] = useState<Project[]>(() =>{
        const storedProjects = localStorage.getItem("project");
        if (storedProjects) {
        return storedProjects ? JSON.parse(storedProjects) : [];
        }
    });

    
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


    return(
    <div className="grid max-w-full h-full justify-center items-center pt-50">
        <div className="grid grid-cols-2 gap-2">
        <InputField  placeholder='Project Name' value={projectInput} onChange={(e) => {setProjectInput(e.target.value)}} />
        <button onClick={addProject} type='submit' className='gap-0 w-30 h-8 border rounded-sm transform transition duration-300 hover:scale-110' >Add Project</button>
        </div>
        <br/>
        <div className="">
        <br />
        <div className="grid grid-cols-1 gap-5">
        {project.map((proj) => (
            <div key={proj.id}>
            <li className="list-none border rounded-sm p-2 bg-indigo-50 h-20 items-center-safe justify-between w-full flex hover:scale-102 ">
            <a href={`/user/task/${proj.id}`}>
                <h2 className="text-shadow-lg text-3xl w-50">{proj.textProject}</h2>
            </a>
            <div className="flex items-center pl-150 gap-2">
            <Checkbox className="w-5 h-5 border rounded-sm"  disabled checked={proj.completed} onCheckedChange={() => {
                const updatedProjects = project.map((p) => 
                    p.id === proj.id ? { ...p, completed: !p.completed } : p
                );
                setProject(updatedProjects);
                localStorage.setItem("project", JSON.stringify(updatedProjects));
            }} />
            {proj.completed && <h3 className="text-green-500 font-bold w-50">Completed</h3>} {!proj.completed && <h3 className="text-red-500 font-bold w-50">Not Completed</h3>}
                <button onClick={() => deleteProject(proj.id)} className="w-20 border rounded-sm text-red-500 hover:bg-red-300 hover:scale-110 ml-30">Delete</button> 
            </div>
            </li>
            </div>
        ))}
      </div>
    </div>
    </div>
    )
};