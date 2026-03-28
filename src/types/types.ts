export type Project = {
    id: number;
    textProject: string;
    completed: boolean;
    extendedTasks: Task[];
}

export type Task = {
    taskId: number;
    textTask: string;
    isCompleted: boolean;
}