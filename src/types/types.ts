export type Project = {
    id: number;
    name: string;
    tasks: Task[];
}

export type Task = {
    id: number;
    name: string;
    isCompleted: boolean;
    projectId: number;
}