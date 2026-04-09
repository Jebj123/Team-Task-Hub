import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { parseStoredProjects } from "../../Shared/schema/schema";
import { useProjectAndTaskManage } from "../../Shared/components/projectsandTaskManager/projectAndTaskManage";
  
    export function ProjectDetailCard(){
        const projects = useProjectAndTaskManage((state) => state.projects);
        const initializeProjects = useProjectAndTaskManage((state) => state.initializeProjects);

        useEffect(() => {
            initializeProjects(parseStoredProjects(localStorage.getItem("project")));
        }, [initializeProjects]);

        const { projectId } = useParams();

        const projectDetail = projects.find((p) => p.id === Number(projectId));
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