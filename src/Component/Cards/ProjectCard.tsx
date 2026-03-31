import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Project, Task } from "../../types/types"
import { InputField } from "../Field/InputField";
import { Card } from "../../Shared/components/ui/card";
import { Button } from "../../Shared/components/ui/button";
import { SelectField } from "../Field/SelectField";
import { parseStoredProjects, parseStoredTasks } from "../../schema/schema";



export function ProjectCard() {
    const [project, setProject] = useState<Project[]>(() =>{
        return parseStoredProjects(localStorage.getItem("project"));
    });
    const [task] = useState<Task[]>(() =>{
        return parseStoredTasks(localStorage.getItem("extendedTasks"));
    });

    useEffect(() => {
        localStorage.setItem("project", JSON.stringify(project));
    }, [project]);

    const [projectInput, setProjectInput] = useState("");
    const [fieldInput, setFieldInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [activeSearchTerm, setActiveSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState<"none" | "high-to-low">("none");
    const [filterImportance, setFilterImportance] = useState<string>("");

    const sortHighToLow = () => {
        setSortOrder("high-to-low");
    };

    const addProject = (inputValue: string, importance: string) => {
        const trimmedProjectInput = inputValue.trim();

        if (!trimmedProjectInput) {
            window.alert("Please enter a project name.");
            return;
        }

        const selectedImportance = importance || "low";

        const newProject = {
            id: Date.now(),
            textProject: trimmedProjectInput,
            completed: false,
            projectImportance: selectedImportance,
            extendedTasks: [],
        };

        setProject((prev) => {
            const nextProjects = [...prev, newProject];
            localStorage.setItem("project", JSON.stringify(nextProjects));
            return nextProjects;
        });
        setProjectInput("");
        setFieldInput("");
        setSearchTerm("");
        setActiveSearchTerm("");
        setFilterImportance("");
        setSortOrder("none");
    };

    const deleteProject = (id: number) => {
        setProject((prev) => prev.filter((proj) => proj.id !== id));
    };

    const searchProjects = (textProject: string) => {
        setActiveSearchTerm(textProject.trim());
        setSearchTerm("");
    };

    const filterbyImportance = (importance: string) => {
        setFilterImportance(importance);
    };

    const importanceOrder: Record<string, number> = { low: 1, medium: 2, high: 3 };

    const projectLength = project.length;
    const completedProjects = project.filter((proj) => {
        const projTasks = task.filter((t) => t.projectId === proj.id);
        return projTasks.length > 0 && projTasks.every((t) => t.isCompleted);
    }).length;
    const projectProgress = projectLength === 0 ? 0 : Math.round((completedProjects / projectLength) * 100);

    const taskLength = task.length;
    const completedTasks = task.filter((t) => t.isCompleted).length;
    const taskProgress = taskLength === 0 ? 0 : Math.round((completedTasks / taskLength) * 100);

    let displayedProjects = project;

    if (activeSearchTerm) {
        displayedProjects = displayedProjects.filter((proj) =>
            proj.textProject.toLowerCase().includes(activeSearchTerm.toLowerCase())
        );
    }

    if (filterImportance && filterImportance !== "All") {
        displayedProjects = displayedProjects.filter((proj) =>
            proj.projectImportance.toLowerCase() === filterImportance.toLowerCase()
        );
    }

    if (sortOrder === "high-to-low") {
        displayedProjects = [...displayedProjects].sort(
            (a, b) => (importanceOrder[b.projectImportance] ?? 0) - (importanceOrder[a.projectImportance] ?? 0)
        );
    }

    return(
    <div className="grid w-full h-full justify-center items-center pl-24 pt-7 pr-58">
    <div className="grid grid-col-1 pb-10 ml-197 gap-1">
    <h3 className="text-1xl font-bold ">Search Projects:</h3>
    <div className="grid grid-cols-2 gap-3">
    <InputField placeholder="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
    <Button className="w-30 h-8 transition-transform duration-300 hover:scale-110 mt-1" onClick={() => searchProjects(searchTerm)}>Search</Button>
    </div>
    </div>
    <div className="grid grid-cols-2 gap-2 items-center justify-center w-full pl-66 pb-10 ">
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
        <div className="items-center justify-center w-full flex-col">
        <div className="flex flex-wrap w-300 items-center gap-2">
        <InputField placeholder='Project Name' value={projectInput} onChange={(e) => {setProjectInput(e.target.value)}} />
        <SelectField placeholder="Importance" value={fieldInput} onChange={setFieldInput} />
        <Button type='button' onClick={() => addProject(projectInput, fieldInput)} className='border-black gap-0 w-30 h-8 transition-transform duration-300 transform-gpu hover:scale-110'>Add Project</Button>
        </div>
        <div className="flex justify-end gap-2 items-center">
        <h1 className="text-1xl font-bold">Filter by importance:</h1>
        {(["All", "High", "Medium", "Low"] as const).map((level) => (
            <Button
                key={level}
                variant={filterImportance === level || (level === "All" && !filterImportance) ? "default" : "outline"}
                onClick={() => filterbyImportance(level)}
                className="selection:bg-gray-400 hover:bg-gray-200 hover:scale-102"
            >
                {level}
            </Button>
        ))}
        </div>
        </div>
        <br/>
        <div className="">
        <br />
        <div className="grid grid-cols-1  border rounded-sm">
        <div className="flex justify-between border">
            <h2 className="text-2xl font-bold underline text-center pl-2">Project</h2><h2 className="text-2xl font-bold underline text-center hover:scale-105 pl-32" onClick={sortHighToLow}>Importance</h2><h2 className="text-2xl font-bold text-center underline pl-50">Project status</h2><h2 className="text-2xl font-bold text-center pr-8 underline">Delete Project</h2>
        </div>
        {displayedProjects.map((proj) => {
            const projTasks = task.filter((t) => t.projectId === proj.id);
            const isCompleted = projTasks.length > 0 && projTasks.every((t) => t.isCompleted);
            return (
            <div key={proj.id}>
            <li className="flex list-none border  p-2 bg-gray-50 h-20 items-center justify-between hover:font-bold ">
            <Link to={`/user/task/${proj.id}`}>
                <h2 className="text-shadow-lg text-2xl w-50">{proj.textProject}</h2>
            </Link>
            <div className="pl-29">
            <h1 className="text xl capitalize pl-10 w-35 ">{proj.projectImportance}</h1>
            </div>
            <div className="flex items-center gap-2 justify-between w-300">
            {isCompleted
                ? <h3 className="text-green-500 font-bold w-50 pl-75">Completed</h3>
                : <h3 className="text-red-500 font-bold w-50 pl-75">In Progress</h3>}
                <button onClick={() => deleteProject(proj.id)} type="button" className=" border rounded-sm text-red-500 hover:bg-red-300 hover:scale-110 mr-20">Delete</button> 
            </div>
            </li>
            </div>
            );
        })}
      </div>
    </div>
    </div>
    )
};