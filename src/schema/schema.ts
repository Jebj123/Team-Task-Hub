import z from 'zod';

export const projectSchema = z.object({
    id: z.number(),
    textProject: z.string(),
    completed: z.boolean(),
});
