import { useEffect, useState } from 'react'
import type { Task } from '../types/types';
import { ProjectDetailCard } from '../Component/Cards/projectDetailCard';
import { InputField } from '../Component/Field/InputField';
import { useParams } from 'react-router-dom';
import { Checkbox } from "../Shared/components/ui/checkBox";
import { Card } from '../Shared/components/ui/card';
import { Button } from '../Shared/components/ui/button';
import { SelectField } from '../Component/Field/SelectField';
import { parseStoredTasks } from '../schema/schema';


export const ViewProjectDetails = () => {
    const [task, setTasks] = useState<Task[]>(() =>{
                return parseStoredTasks(localStorage.getItem("extendedTasks"));
      });

      const { projectId } = useParams();
      const selectedProjectId = Number(projectId);

      const [taskInput, setTaskInput] = useState("");
    const [fieldInput, setFieldInput] = useState("");

      const [filterImportance, setFilterImportance] = useState("");
      const [searchTerm, setSearchTerm] = useState("");
      const [activeSearchTerm, setActiveSearchTerm] = useState("");
      const [sortOrder, setSortOrder] = useState<"none" | "high-to-low">("none");

      // Persist tasks to localStorage whenever they change
      useEffect(() => {
          localStorage.setItem("extendedTasks", JSON.stringify(task));
      }, [task]);

      const addTask = (inputValue: string, importance: string) => {
          const trimmedTaskInput = inputValue.trim();

          if (!trimmedTaskInput) {
              window.alert("Please enter a task.");
              return;
          }

          const selectedImportance = importance || "low";

          const newTask = {
              taskId: Date.now(),
              textTask: trimmedTaskInput,
              projectId: selectedProjectId,
              isCompleted: false,
              taskImportance: selectedImportance,
          };

          setTasks((prev) => [...prev, newTask]);
          setTaskInput("");
          setFieldInput("");
          setSearchTerm("");
          setActiveSearchTerm("");
          setFilterImportance("");
          setSortOrder("none");
      }
      const sortHighToLow = () => {
          setSortOrder("high-to-low");
      };

      // eyða verkefni
      const deleteTask = (taskId: number) => {
          setTasks((prev) => prev.filter((t) => t.taskId !== taskId));
      };
  
      //toggle verkefni
      const toggleTask = (taskId: number) => {
          setTasks((prev) =>
              prev.map((t) => t.taskId === taskId ? { ...t, isCompleted: !t.isCompleted } : t)
          );
      };

        const tasksForSelectedProject = task.filter(
        (task) => task.projectId === selectedProjectId
        );
    
        const completedTasks = tasksForSelectedProject.filter((t) => t.isCompleted).length;
        const totalTasks = tasksForSelectedProject.length;
        const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

        const searchTasks = (textTask: string) => {
            setActiveSearchTerm(textTask.trim());
            setSearchTerm("");
        };   
        const filterbyImportance = (importance: string) => {
            setFilterImportance(importance);
        };

        const importanceOrder: Record<string, number> = { low: 1, medium: 2, high: 3 };
        let displayedTasks = tasksForSelectedProject;

        if (activeSearchTerm) {
            displayedTasks = displayedTasks.filter((t) =>
                t.textTask.toLowerCase().includes(activeSearchTerm.toLowerCase())
            );
        }
        if (filterImportance && filterImportance !== "All") {
            displayedTasks = displayedTasks.filter((t) =>
                t.taskImportance.toLowerCase() === filterImportance.toLowerCase()
            );
        }
        if (sortOrder === "high-to-low") {
            displayedTasks = [...displayedTasks].sort(
                (a, b) => (importanceOrder[b.taskImportance] ?? 0) - (importanceOrder[a.taskImportance] ?? 0)
            );
        }

    return (
        <div className="w-full max-w-6xl pt-7 ml-25 ">
                <div className="grid grid-cols-1 gap-1 pb-10 md:ml-auto md:w-1/2">
    <h3 className="text-1xl font-bold ml-52 ">Search Tasks:</h3>
    <div className="grid grid-cols-2 gap-3 ml-52">
    <InputField placeholder="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    <Button className="w-30 h-8 border border-black/20 transition-transform duration-300 hover:scale-110 mt-1" onClick={() => searchTasks(searchTerm)}>Search</Button>
    </div>
    </div>
        <div className='flex items-center justify-center pb-10'>
        <Card className="w-60 h-50 items-center justify-center gap-2">
            <h1 className="text-2xl text-center font-bold underline">Tasks Completed</h1>
            <p className="text-2xl font-bold">{completedTasks}/{totalTasks}</p>
            {progress > 0 && (
                <div className="w-1/2 bg-red-400 rounded-full h-4 mb-4">
                    <div className="bg-green-400 h-4 rounded-full items-center flex justify-center " style={{ width: `${progress}%` }}>{progress}%</div>
                </div>
            )}
            {progress === 100 && (
                <h3 className="text-green-500 font-bold ">Good job!</h3>
            )}
        </Card>
    </div>
        <div className="flex list-none border-4 rounded-sm p-2 bg-gray-50  h-20 justify-between items-center ">
        <ProjectDetailCard/>
    <div className="grid grid-cols-1 items-end">
        {completedTasks === totalTasks && totalTasks > 0 ? (
            <h3 className="text-green-500 font-bold w-50 pl-2">Completed</h3>
        ) : (
            <h3 className="text-red-500 font-bold w-50 pl-2">In Progress</h3>
        )}
        </div>
        </div>
        <div className="pt-10">
        </div>
        <div className='flex flex-wrap items-center gap-4'>
        <h1 className="text-1xl font-bold">Add Task:</h1>
        <InputField placeholder='Task Name' value={taskInput} onChange={(e) => {setTaskInput(e.target.value)}} />
        <SelectField placeholder="Importance" value={fieldInput} onChange={setFieldInput} />
        <Button onClick={() => addTask(taskInput, fieldInput)} type='button' className='w-30 h-8 border border-black transition-transform duration-300 hover:scale-110'>Add Task</Button>
        <div className="flex flex-wrap items-center gap-2 md:ml-auto">
        <h1 className="text-1xl font-bold">Filter by importance:</h1>
        {(["All", "High", "Medium", "Low"] as const).map((level) => (
            <Button
                key={level}
                variant={filterImportance === level || (level === "All" && !filterImportance) ? "default" : "outline"}
                onClick={() => filterbyImportance(level)}
                className="selection:bg-gray-400"
            >
                {level}
            </Button>
        ))}
        </div>
        </div>
        <br />
        <div className="grid grid-cols-1 rounded-sm border-2 w-full">
        <div className='grid grid-cols-[minmax(0,1.4fr)_minmax(120px,.6fr)_minmax(120px,.6fr)_auto] items-center gap-4 border px-5 py-3 pr-15'>
        <h1 className='text-2xl font-bold underline'>Tasks</h1><h1 className='text-2xl font-bold underline cursor-pointer' onClick={sortHighToLow}>Importance</h1><h1 className='text-2xl font-bold underline'>Status</h1><h1 className='text-2xl font-bold underline'>Delete</h1>
        </div>
        {displayedTasks.map((t) => (
            <div key={t.taskId}>
            <li className="grid list-none grid-cols-[minmax(0,1.4fr)_minmax(120px,.6fr)_minmax(120px,.6fr)_auto] items-center gap-4 border bg-gray-50 p-4 hover:font-bold">
            <span className='min-w-0 text-xl'>{t.textTask}</span>
            <span className='text-xl capitalize pl-10'>{t.taskImportance}</span>
            <div className='pl-7'>
                <Checkbox className="bg-white h-5 w-5 text-green-800 border-black hover:scale-105" onClick={() => toggleTask(t.taskId)} checked={t.isCompleted}>
                </Checkbox>
            </div>
            <div >
                <button onClick={() => deleteTask(t.taskId)} className='text-red-500 w-20 h-8 border rounded-sm transform transition duration-300 hover:scale-110 mr-10'>Delete</button>
            </div>
            </li>
            </div>
        ))}
        </div>
    </div>
  )
}

export default ViewProjectDetails