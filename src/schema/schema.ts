import z from 'zod';

export const taskSchema = z.object({
    taskId: z.coerce.number(),
    projectId: z.coerce.number(),
    taskImportance: z.string(),
    textTask: z.string(),
    isCompleted: z.boolean(),
});

export const projectSchema = z.object({
    id: z.coerce.number(),
    textProject: z.string(),
    completed: z.boolean(),
    projectImportance: z.string(),
    extendedTasks: z.array(taskSchema),
});

const projectListSchema = z.array(projectSchema);
const taskListSchema = z.array(taskSchema);

const safelyParseStorage = (storedValue: string | null) => {
    if (!storedValue) {
        return null;
    }

    try {
        return JSON.parse(storedValue);
    } catch {
        return null;
    }
};

const normalizeStoredList = <T>(parsedValue: T | T[] | null) => {
    if (parsedValue === null) {
        return [];
    }

    return Array.isArray(parsedValue) ? parsedValue : [parsedValue];
};

export const parseStoredProjects = (storedProjects: string | null) => {
    const parsedProjects = normalizeStoredList(safelyParseStorage(storedProjects));
    const result = projectListSchema.safeParse(parsedProjects);
    return result.success ? result.data : [];
};

export const parseStoredTasks = (storedTasks: string | null) => {
    const parsedTasks = normalizeStoredList(safelyParseStorage(storedTasks));
    const result = taskListSchema.safeParse(parsedTasks);
    return result.success ? result.data : [];
};
