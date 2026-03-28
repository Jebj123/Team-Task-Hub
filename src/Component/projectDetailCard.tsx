import { useState } from "react";
import type { Project, Task } from "../types/types";
import { useParams } from "react-router-dom";
import { Checkbox } from "../components/ui/checkBox";
import calculateProgress  from "../user/ViewProjectDetails";

   
    export function ProjectDetailCard(){
        const [project, setProject] = useState<Project[]>(() =>{
            const storedProjects = localStorage.getItem("project");
            return storedProjects ? JSON.parse(storedProjects) : [];
        });
        const { projectId } = useParams();

        const projectDetail = project.find((p) => p.id === Number(projectId));
        if(!projectDetail){
            return <div>Project not found</div>;
        }

        return (
            <div >
                <h1>{projectDetail.textProject}</h1>
                <div>
                  
                </div>
            </div>
        )
    }