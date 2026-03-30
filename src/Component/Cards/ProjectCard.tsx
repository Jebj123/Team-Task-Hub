import { useEffect, useState } from "react";
import type { Project, Task } from "../../types/types"
import { InputField } from "../Field/InputField";
import { Card } from "../../Shared/components/ui/card";
import { Button } from "../../Shared/components/ui/button";
import { SelectField } from "../Field/SelectField";



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
    const [searchTerm, setSearchTerm] = useState("");
    const [displayedProjects, setDisplayedProjects] = useState<Project[]>(project);

    useEffect(() => {
        setDisplayedProjects(project);
    }, [project]);

    const sortHighToLow = () => {
        const importanceOrder: Record<"low" | "medium" | "high", number> = {
            low: 1,
            medium: 2,
            high: 3,
        };

        const getImportanceRank = (importance: string) =>
            importanceOrder[importance as keyof typeof importanceOrder] ?? 0;

        const sortedProjects = [...project].sort(
            (a, b) => getImportanceRank(b.projectImportance) - getImportanceRank(a.projectImportance)
        );

        setDisplayedProjects(sortedProjects);
    };


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
                projectImportance: "low",
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

    const searchProjects = (textProject: string) => {
        if (!textProject.trim()) {
            setDisplayedProjects(project);
            return;
        }
        const filteredProjects = project.filter((proj) =>
            proj.textProject.toLowerCase().includes(textProject.toLowerCase())
        );
        setDisplayedProjects(filteredProjects);
        setSearchTerm("");
    };

    const projectLength = project.length;
    const completedProjects = project.filter((proj) => proj.completed).length;
    const projectProgress = projectLength === 0 ? 0 : Math.round((completedProjects / projectLength) * 100);

    const taskLength = task.length;
    const completedTasks = task.filter((t) => t.isCompleted).length;
    const taskProgress = taskLength === 0 ? 0 : Math.round((completedTasks / taskLength) * 100);

    return(
    <div className="grid w-fullh-full justify-center items-center pl-20 pt-4">
    <div className="grid grid-col-1 pb-10 w-1/2 ml-234 gap-2">
    <h3 className="text-1xl font-bold ">Search Projects:</h3>
    <div className="grid grid-cols-2 gap-3">
    <InputField placeholder="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
    <Button className="w-30 h-8 border-  transform transition duration-300 hover:scale-110 mt-1" onClick={() => searchProjects(searchTerm)}>Search</Button>
    </div>
    </div>
    <div className="grid grid-cols-2 gap-2 items-center justify-center w-full pl-90 pb-10">
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
            <h2 className="text-2xl font-bold underline text-center pl-2">Project</h2><h2 className="text-2xl font-bold underline text-center pr-42 hover:scale-105" onClick={sortHighToLow}>Importance</h2><h2 className="text-2xl font-bold text-center underline pr-12">Project status</h2><h2 className="text-2xl font-bold text-center pr-8 underline">Delete Project</h2>
        </div>
        {displayedProjects.map((proj) => (
            <div key={proj.id}>
            <li className="list-none border  p-2 bg-gray-50 h-20 items-center-safe justify-between flex hover:font-bold ">
            <a href={`/user/task/${proj.id}`}>
                <h2 className="text-shadow-lg text-2xl w-50">{proj.textProject}</h2>
            </a>
            <div className="pl-29">
            <SelectField placeholder="Select Importance" value={proj.projectImportance} onChange={(value) => {
                const updatedProjects = project.map((projectItem) => {
                    if (projectItem.id === proj.id) {
                        return { ...projectItem, projectImportance: value };
                    }
                    return projectItem;
                });
                setProject(updatedProjects);
            }} />
            </div>
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