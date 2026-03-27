import z from 'zod';

export const projectSchema = z.object({
    id: z.number(),
    name: z.string(),
    extendedTasks: z.array(z.object({
        id: z.number(),
        name: z.string(),
        isCompleted: z.boolean(),
        projectId: z.number(),
    }))
});
