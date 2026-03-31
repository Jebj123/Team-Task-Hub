import { useState } from "react";
import type { Project } from "../../types/types";
import { useParams } from "react-router-dom";
import { parseStoredProjects } from "../../schema/schema";
  
    export function ProjectDetailCard(){
        const [project] = useState<Project[]>(() =>{
            return parseStoredProjects(localStorage.getItem("project"));
        });
        const { projectId } = useParams();

        const projectDetail = project.find((p) => p.id === Number(projectId));
        if(!projectDetail){
            return <div>Project not found</div>;
        }

        return (
            <div className="flex w-245  ">
                <h1 className="text-5xl underline font-bold">{projectDetail.textProject} :</h1>
             
                <div>
                  
                </div>
            </div>
        )
    }