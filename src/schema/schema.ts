import z from 'zod';
import { extend } from 'zod/mini';

export const projectSchema = z.object({
    id: z.number(),
    textProject: z.string(),
    completed: z.boolean(),
    textTask: z.string(),
    extendedTasks: z.array(z.object({
        taskId: z.number(),
        projectId: z.number(),
        textTask: z.string(),
        isCompleted: z.boolean()
    })),
});
