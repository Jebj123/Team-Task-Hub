import React, { useCallback, useEffect, useState } from "react";
import type { Project } from "../types/types"
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
    <div className="grid max-w-full h-full">
        <div className="grid grid-cols-1 gap-2">
        <InputField  placeholder='Project Name' value={projectInput} onChange={(e) => {setProjectInput(e.target.value)}} />
        <button onClick={addProject} type='submit' className='gap-0 w-30 h-8 border rounded-sm transform transition duration-300 hover:scale-110' >Add Project</button>
        </div>
        <br/>
        <div className="">
        <br />
        <div className="grid grid-cols-1 gap-5">
        {project.map((proj) => (
            <div key={proj.id}>
            <li className=" flex list-none border rounded-sm p-2 bg-gray-200 w-1/2 h-15 justify-between items-center ">
            <a href={`/user/task/${proj.id}`}>
                <span className="text-shadow-lg">{proj.textProject}</span>
            </a>
                <button onClick={() => deleteProject(proj.id)} className="w-20 border rounded-sm text-red-500 hover:bg-red-300 hover:scale-110">Delete</button>
            </li>
            </div>
        ))}
      </div>
    </div>
    </div>
    )
};