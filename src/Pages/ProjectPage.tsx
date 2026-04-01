import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../Shared/types/types"
import { InputField } from "../Component/Field/InputField";
import { Card } from "../Shared/components/ui/card";
import { Button } from "../Shared/components/ui/button";
import { SelectField } from "../Component/Field/SelectField";
import { parseStoredProjects } from "../Shared/schema/schema";
import upAndDownArrow from "../../src/assets/UpandDown.png";



export function ProjectCard() {
    const [project, setProject] = useState<Project[]>(() =>{
        return parseStoredProjects(localStorage.getItem("project"));
    });

    useEffect(() => {
        localStorage.setItem("project", JSON.stringify(project));
    }, [project]);

    const [projectInput, setProjectInput] = useState("");
    const [fieldInput, setFieldInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [activeSearchTerm, setActiveSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState<"none" | "high-to-low" | "low-to-high">("none");
    const [sortLetterOrder, setSortLetterOrder] = useState<"none" | "a-to-z" | "z-to-a">("none");
    const [sortCompleted, setSortCompleted] = useState<"none" | "completed-to-In Progress" | "In Progress-to-completed">("none");
    const [filterImportance, setFilterImportance] = useState<string>("");
    
    const sortHighToLow = () => {
        setSortLetterOrder("none");
        setSortCompleted("none");
        setSortOrder((prev) => (prev === "high-to-low" ? "low-to-high" : "high-to-low"));
    };
    const sortAToZ = () => {
        setSortOrder("none");
        setSortCompleted("none");
        setSortLetterOrder((prev) => (prev === "a-to-z" ? "z-to-a" : "a-to-z"));
    };

    const sortCompletedStatus = () => {
        setSortOrder("none");
        setSortLetterOrder("none");
        setSortCompleted((prev) => (prev === "completed-to-In Progress" ? "In Progress-to-completed" : "completed-to-In Progress"));
    }

    const addProject = (inputValue: string, importance: string) => {
        const trimmedProjectInput = inputValue.trim();
        const trimmedImportance = importance.trim();

        if (!trimmedProjectInput) {
            window.alert("Please enter a project name.");
            return;
        }

        if (!trimmedImportance) {
            window.alert("Please select an importance level.");
            return;
        }

        const newProject = {
            id: Date.now(),
            textProject: trimmedProjectInput,
            completed: false,
            projectImportance: trimmedImportance,
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
    const task = project.flatMap((proj) => proj.extendedTasks);

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

    if(sortLetterOrder === "a-to-z") {
        displayedProjects = [...displayedProjects].sort((a, b) => a.textProject.localeCompare(b.textProject));
    }
    if(sortLetterOrder === "z-to-a") {
        displayedProjects = [...displayedProjects].sort((a, b) => b.textProject.localeCompare(a.textProject));
    }

    if (sortOrder === "high-to-low") {
        displayedProjects = [...displayedProjects].sort(
            (a, b) => (importanceOrder[b.projectImportance.toLowerCase()] ?? 0) - (importanceOrder[a.projectImportance.toLowerCase()] ?? 0)
        );
    }

    if (sortOrder === "low-to-high") {
        displayedProjects = [...displayedProjects].sort(
            (a, b) => (importanceOrder[a.projectImportance.toLowerCase()] ?? 0) - (importanceOrder[b.projectImportance.toLowerCase()] ?? 0)
        );
    }
    if (sortCompleted === "completed-to-In Progress") {
        displayedProjects = [...displayedProjects].sort((a, b) => {
            const aTasks = task.filter((t) => t.projectId === a.id);
            const bTasks = task.filter((t) => t.projectId === b.id);
            const aCompleted = aTasks.length > 0 && aTasks.every((t) => t.isCompleted);
            const bCompleted = bTasks.length > 0 && bTasks.every((t) => t.isCompleted);
            return Number(bCompleted) - Number(aCompleted);
        });
    }

    if (sortCompleted === "In Progress-to-completed") {
        displayedProjects = [...displayedProjects].sort((a, b) => {
            const aTasks = task.filter((t) => t.projectId === a.id);
            const bTasks = task.filter((t) => t.projectId === b.id);
            const aCompleted = aTasks.length > 0 && aTasks.every((t) => t.isCompleted);
            const bCompleted = bTasks.length > 0 && bTasks.every((t) => t.isCompleted);
            return Number(aCompleted) - Number(bCompleted);
        });
    }
    return(
    <div className="w-full max-w-6xl pt-7 ml-auto mr-auto">
        <div className="grid grid-cols-1 gap-1 pb-10 md:ml-auto md:w-1/2 pl-29">
    <h3 className="text-1xl font-bold ">Search Projects:</h3>
    <div className="flex gap-3 w-full">
    <InputField placeholder="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
    <Button className="w-30 h-8 border border-black/20 transition-transform duration-300 hover:scale-110 mt-1" onClick={() => searchProjects(searchTerm)}>Search</Button>
    </div>
    </div>
    <div className="grid grid-cols-2 gap-2 items-center justify-center w-full pl-57 pb-10 ">
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
        <h1 className="flex pb-10 text-5xl underline font-bold items-center justify-center">Project</h1>
        <div className="items-center justify-center w-full flex-col">
        <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-1xl font-bold">Add Project:</h1>
        <InputField placeholder='Project Name' value={projectInput} onChange={(e) => {setProjectInput(e.target.value)}} />
        <SelectField placeholder="Importance" value={fieldInput} onChange={setFieldInput} />
        <Button type='button' onClick={() => addProject(projectInput, fieldInput)} className='w-30 h-8 border border-black transition-transform duration-300 hover:scale-110'>Add Project</Button>
        <div className="flex flex-wrap items-center gap-2 md:ml-auto">
        <h1 className="text-1xl font-bold">Filter by importance:</h1>
        {(["All", "High", "Medium", "Low"] as const).map((level) => (
            <Button
                key={level}
                variant={filterImportance === level || (level === "All" && !filterImportance) ? "default" : "outline"}
                onClick={() => filterbyImportance(level)}
                className=" hover:bg-gray-200 hover:scale-102"
            >
                {level}
            </Button>
        ))}
        </div>
        </div>
        <br />
        <div className="grid grid-cols-1 rounded-sm border-2 w-full overflow-hidden">
        <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(120px,.6fr)_minmax(120px,.6fr)_minmax(140px,.5fr)] items-stretch gap-0 border-b bg-gray-100">
            <div className="px-4 py-3 border-r flex items-center">
                <h2 className="text-2xl font-bold underline text-left cursor-pointer" onClick={sortAToZ}>Project<img src={upAndDownArrow} alt="Sort Arrow" className="w-4 inline-block ml-2" /></h2>
            </div>
            <div className="px-4 py-3 border-r flex items-center">
                <h2 className="text-2xl font-bold underline text-left cursor-pointer" onClick={sortHighToLow}>Importance<img src={upAndDownArrow} alt="Sort Arrow" className="w-4 inline-block ml-2" /></h2>
            </div>
            <div className="px-4 py-3 border-r flex items-center">
                <h2 className="text-2xl font-bold text-left underline cursor-pointer" onClick={sortCompletedStatus}>Project status<img src={upAndDownArrow} alt="Sort Arrow" className="w-4 inline-block ml-2" /></h2>
            </div>
            <div className="px-4 py-3 flex items-center">
                <h2 className="text-2xl font-bold text-left underline">Delete</h2>
            </div>
        </div>
        {displayedProjects.map((proj) => {
            const projTasks = task.filter((t) => t.projectId === proj.id);
            const isCompleted = projTasks.length > 0 && projTasks.every((t) => t.isCompleted);
            return (
            <li key={proj.id} className="grid list-none grid-cols-[minmax(0,1.4fr)_minmax(120px,.6fr)_minmax(120px,.6fr)_minmax(140px,.5fr)] items-stretch gap-0 border-b bg-gray-50 hover:font-bold">
            <div className="px-4 py-3 border-r flex items-center">
            <Link to={`/user/task/${proj.id}`}>
                <h2 className="text-shadow-lg text-2xl">{proj.textProject}</h2>
            </Link>
            </div>
            <div className="px-4 py-3 border-r flex items-center">
            <h1 className="text-xl capitalize">{proj.projectImportance}</h1>
            </div>
            <div className="px-4 py-3 border-r flex items-center">
            {isCompleted
                ? <h3 className="text-green-500 font-bold">Completed</h3>
                : <h3 className="text-red-500 font-bold">In Progress</h3>}
            </div>
            <div className="px-4 py-3 flex items-center">
                <button onClick={() => deleteProject(proj.id)} type="button" className="text-red-500 w-20 h-8 border rounded-sm transform transition duration-300 hover:scale-110">Delete</button>
            </div>
            </li>
            );
        })}
      </div>
    </div>
        </div>
    )
};