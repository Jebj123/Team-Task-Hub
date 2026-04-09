import { useEffect, useState } from 'react'
import { ProjectDetailCard } from '../Component/Cards/projectDetailCard';
import { InputField } from '../Component/Field/InputField';
import { useParams } from 'react-router-dom';
import { Checkbox } from "../Shared/components/ui/checkBox";
import { Card } from '../Shared/components/ui/card';
import { Button } from '../Shared/components/ui/button';
import { SelectField } from '../Component/Field/SelectField';
import { parseStoredProjects } from '../Shared/schema/schema';
import upAndDownArrow from "../assets/UpandDown.png"
import { useProjectAndTaskManage } from '../Shared/components/projectsandTaskManager/projectAndTaskManage';



export const ViewProjectDetails = () => {
    const projects = useProjectAndTaskManage((state) => state.projects);
    const tasks = useProjectAndTaskManage((state) => state.tasks);
    const initializeProjects = useProjectAndTaskManage((state) => state.initializeProjects);
    const initializeTasks = useProjectAndTaskManage((state) => state.initializeTasks);
    const addTaskToStore = useProjectAndTaskManage((state) => state.addTask);
    const deleteTaskFromStore = useProjectAndTaskManage((state) => state.deleteTask);
    const toggleTaskInStore = useProjectAndTaskManage((state) => state.toggleTaskCompletion);
    

      const { projectId } = useParams();
      const selectedProjectId = Number(projectId);

      const [taskInput, setTaskInput] = useState("");
      const [fieldInput, setFieldInput] = useState("");

      const [filterImportance, setFilterImportance] = useState("");
      const [searchTerm, setSearchTerm] = useState("");
      const [activeSearchTerm, setActiveSearchTerm] = useState("");
      const [sortOrder, setSortOrder] = useState<"none" | "high-to-low" | "low-to-high">("none");
      const [sortLetterOrder, setSortLetterOrder] = useState<"none" | "a-to-z" | "z-to-a">("none");
      const [sortStatusOrder, setSortStatusOrder] = useState<"none" | "completed-to-incomplete" | "incomplete-to-completed">("none");

      useEffect(() => {
          const storedProjects = parseStoredProjects(localStorage.getItem("project"));
          initializeProjects(storedProjects);
          initializeTasks(storedProjects.flatMap((project) => project.extendedTasks));
      }, [initializeProjects, initializeTasks]);

      useEffect(() => {
          const projectsWithTasks = projects.map((project) => ({
              ...project,
              extendedTasks: tasks.filter((task) => task.projectId === project.id),
          }));

          localStorage.setItem("project", JSON.stringify(projectsWithTasks));
      }, [projects, tasks]);

      const addTask = (inputValue: string, importance: string) => {
          const trimmedTaskInput = inputValue.trim();
          const trimmedImportance = importance.trim();

          if (!trimmedTaskInput) {
              window.alert("Please enter a task.");
              return;
          }
          if (!trimmedImportance) {
              window.alert("Please select an importance level.");
              return;
          }

          const newTask = {
              taskId: Date.now(),
              textTask: trimmedTaskInput,
              projectId: selectedProjectId,
              isCompleted: false,
              taskImportance: trimmedImportance,
          };

          addTaskToStore(newTask);
          setTaskInput("");
          setFieldInput("");
          setSearchTerm("");
          setActiveSearchTerm("");
          setFilterImportance("");
      }
      const sortHighToLow = () => {
          setSortLetterOrder("none");
          setSortStatusOrder("none");
          setSortOrder((prev) => (prev === "high-to-low" ? "low-to-high" : "high-to-low"));
      };

      const sortAToZ = () => {
          setSortOrder("none");
          setSortStatusOrder("none");
          setSortLetterOrder((prev) => (prev === "a-to-z" ? "z-to-a" : "a-to-z"));
      }

      const sortCompletedStatus = () => {
          setSortOrder("none");
          setSortLetterOrder("none");
            setSortStatusOrder((prev) => (prev === "completed-to-incomplete" ? "incomplete-to-completed" : "completed-to-incomplete"));
      };

      // eyða verkefni
      const deleteTask = (taskId: number) => {
          deleteTaskFromStore(taskId);
      };
  
      //toggle verkefni
      const toggleTask = (taskId: number) => {
          toggleTaskInStore(taskId);
      };

        const tasksForSelectedProject = tasks.filter((t) => t.projectId === selectedProjectId);
    
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
        if (sortOrder === "low-to-high") {
            displayedTasks = [...displayedTasks].sort(
                (a, b) => (importanceOrder[a.taskImportance] ?? 0) - (importanceOrder[b.taskImportance] ?? 0)
            );
        }
        if(sortLetterOrder === "a-to-z") {
            displayedTasks = [...displayedTasks].sort((a, b) => a.textTask.localeCompare(b.textTask));
        }
        if(sortLetterOrder === "z-to-a") {
            displayedTasks = [...displayedTasks].sort((a, b) => b.textTask.localeCompare(a.textTask));
        }
        if (sortStatusOrder === "completed-to-incomplete") {
            displayedTasks = [...displayedTasks].sort((a, b) => Number(b.isCompleted) - Number(a.isCompleted));
        }
        if (sortStatusOrder === "incomplete-to-completed") {
            displayedTasks = [...displayedTasks].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
        }


    return (
        <div className="w-full max-w-6xl pt-7 ml-auto mr-auto">
            <div className="grid grid-cols-1 gap-1 pb-10 md:ml-auto md:w-1/2 pl-29">
    <h3 className="text-1xl font-bold">Search Tasks:</h3>
    <div className="flex gap-3 w-full">
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
                <h1 className='text-2xl font-bold underline cursor-pointer' onClick={sortAToZ}>Tasks<img src={upAndDownArrow} alt="Sort Arrow" className="w-4 inline-block ml-2" /></h1>
            </div>
            <div className="px-4 py-3 border-r flex items-center">
                <h1 className='text-2xl font-bold underline cursor-pointer' onClick={sortHighToLow}>Importance<img src={upAndDownArrow} alt="Sort Arrow" className="w-4 inline-block ml-2" /></h1>
            </div>
            <div className="px-4 py-3 border-r flex items-center">
                <h1 className='text-2xl font-bold underline cursor-pointer' onClick={sortCompletedStatus}>Status<img src={upAndDownArrow} alt="Sort Arrow" className="w-4 inline-block ml-2" /></h1>
            </div>
            <div className="px-4 py-3 flex items-center">
                <h1 className='text-2xl font-bold underline'>Delete</h1>
            </div>
        </div>
        {displayedTasks.map((t) => (
            <li key={t.taskId} className="grid list-none grid-cols-[minmax(0,1.4fr)_minmax(120px,.6fr)_minmax(120px,.6fr)_minmax(140px,.5fr)] items-stretch gap-0 border-b bg-gray-50 hover:font-bold">
            <div className="px-4 py-3 border-r flex items-center">
                <span className='min-w-0 text-xl'>{t.textTask}</span>
            </div>
            <div className="px-4 py-3 border-r flex items-center">
                <span className='text-xl capitalize'>{t.taskImportance}</span>
            </div>
            <div className="px-4 py-3 border-r flex items-center">
                <Checkbox className="bg-white h-5 w-5 text-green-800 border-black hover:scale-105" onClick={() => toggleTask(t.taskId)} checked={t.isCompleted}>
                </Checkbox>
            </div>
            <div className="px-4 py-3 flex items-center">
                <button onClick={() => deleteTask(t.taskId)} className='text-red-500 w-20 h-8 border rounded-sm transform transition duration-300 hover:scale-110'>Delete</button>
            </div>
            </li>
        ))}
        </div>
    </div>
  )
}

export default ViewProjectDetails