import React, { useEffect, useState } from "react";
import type { Project } from "../types/types"
import { InputField } from "./Field/InputField";
import { Checkbox } from "../components/ui/checkBox";

export function ProjectCard() {
    const [project, setProject] = useState<Project[]>(() =>{
        const storedProjects = localStorage.getItem("project");
        return storedProjects ? JSON.parse(storedProjects) : [];
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
            };
        localStorage.setItem("projects", JSON.stringify([...project, newProject]));
        setProject([...project, newProject]);
        setProjectInput("");
        }
    }

    // eyða verkefni
    const deleteProject = (id: number) => {
        const updatedProjects = project.filter((proj) => proj.id !== id);
        setProject(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
    };

    //toggle verkefni
    const toggleProject = (id: number) => {
        const updatedProjects = project.map((proj) => 
            proj.id === id ? { ...proj, completed: !proj.completed } : proj
        );
        setProject(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
    };

    return(
    <div className="grid w-full h-full pl-200">
        <div className="grid grid-cols-2 gap-4 w-1/2 pl-50">
        <InputField  placeholder='Project Name' value={projectInput} onChange={(e) => {setProjectInput(e.target.value)}} />
        <button onClick={addProject} type='submit' className='w-30 h-8 border rounded-sm transform transition duration-300 hover:scale-110' >Add Project</button>
        </div>
        <br/>
        <div className="">
        <br />
        <div className="grid grid-cols-1 gap-5">
        {project.map((proj) => (
            <div>
            <a href={`/user/task/${proj.id}`}>
            <li key={proj.id} className=" flex list-none border rounded-sm p-2 bg-gray-200 w-1/2 h-15 justify-between items-center ">
                <span>{proj.textProject}</span>
                <div className="grid grid-cols-2 gap-2">
                <Checkbox 
                checked={proj.completed} 
                onCheckedChange={() => toggleProject(proj.id)} 
                className="flex "
                />
                <button onClick={() => deleteProject(proj.id)} className=" border rounded-sm text-red-500 hover:bg-red-300 hover:scale-110">Delete</button>
                </div>
            </li>
            </a>
            </div>
        ))}
      </div>
    </div>
    </div>
    )
};