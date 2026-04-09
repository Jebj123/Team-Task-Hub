import { create } from "zustand"
import type { Project, Task } from "../../types/types"

interface ProjectAndTaskManageState {
    projects: Project[];
    tasks: Task[];
    initializeProjects: (projects: Project[]) => void;
    initializeTasks: (tasks: Task[]) => void;
    addProject: (project: Project) => void;
    addTask: (task: Task) => void;
    toggleProjectCompletion: (projectId: number) => void;
    toggleTaskCompletion: (taskId: number) => void;
    deleteProject: (projectId: number) => void;
    deleteTask: (taskId: number) => void;
}

export const useProjectAndTaskManage = create<ProjectAndTaskManageState>((set) => ({
    projects: [],
    tasks: [],
    initializeProjects: (projects) => set((state) => {
        if (state.projects.length > 0) {
            return state;
        }

        return { projects };
    }),

    initializeTasks: (tasks) => set((state) => {
        if (state.tasks.length > 0) {
            return state;
        }
        return { tasks };
    }),

    addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),

    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

    toggleProjectCompletion: (projectId) => set((state) => ({
        projects: state.projects.map((project) =>
            project.id === projectId ? { ...project, completed: !project.completed } : project
        ),
    })),

    toggleTaskCompletion: (taskId) => set((state) => ({
        tasks: state.tasks.map((task) =>
            task.taskId === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        ),
    })),

    deleteProject: (projectId) => set((state) => ({
        projects: state.projects.filter((project) => project.id !== projectId),
        tasks: state.tasks.filter((task) => task.projectId !== projectId),
    })),

    deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter((task) => task.taskId !== taskId),
    })),

}))