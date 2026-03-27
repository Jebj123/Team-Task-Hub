import z from 'zod';

export const projectSchema = z.object({
    id: z.number(),
    name: z.string(),
    completed: z.boolean(),
    extendedTasks: z.array(z.object({
        id: z.number(),
        text: z.string(),
        isCompleted: z.boolean(),
    }))
});
