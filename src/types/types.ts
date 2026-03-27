export type Project = {
    id: number;
    name: string;
    completed: boolean;
    extendedTasks: Task[];
}

export type Task = {
    id: number;
    text: string;
    isCompleted: boolean;
}