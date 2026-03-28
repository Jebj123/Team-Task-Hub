export type Project = {
    id: number;
    textProject: string;
    completed: boolean;
    extendedTasks: Task[];
}

export type Task = {
    taskId: number;
    projectId: number;
    textTask: string;
    isCompleted: boolean;
}