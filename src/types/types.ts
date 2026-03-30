export type Project = {
    id: number;
    textProject: string;
    completed: boolean;
    projectImportance: string;
    extendedTasks: Task[];
}

export type Task = {
    taskId: number;
    projectId: number;
    textTask: string;
    taskImportance: string;
    isCompleted: boolean;
}