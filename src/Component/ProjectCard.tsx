import React, { useCallback, useRef, useState } from "react";
import type { Project } from "../types/types"
import { InputField } from "./Field/InputField";

export function ProjectCard() {
    const [project, setProject] = useState<Project>({id: 0, name: "", completed: false, extendedTasks: []});

    const inputRef = useRef<HTMLInputElement>(null);
  
    const addProject =  (e) => {
        const inputText = project.name.trim();

        if(inputText === ""){ 
            return null;
        }
        const newProject = {
        id: Date.now(),
        name: inputText,
        completed: false,
        extendedTasks: []
    }
    localStorage.setItem("project", JSON.stringify(newProject));
    console.log("Project added:", newProject);
    if (inputRef.current) {
        inputRef.current.value = newProject.name;
    }
}
    return(
    <div className="flex align-middle justify-center items-center w-full h-40">
        <div className="grid grid-cols-2 gap-4">
        <InputField placeholder='Project Name' value={project.name} onChange={(e) => {setProject({...project, name: e.target.value})}} />
        <button onClick={addProject} type='submit' className='w-30 h-8 border rounded-sm transform transition duration-300 hover:scale-110' >Add Project</button>
        </div>
        <br/>
        <div>
           
        </div>
    </div>
    )
};