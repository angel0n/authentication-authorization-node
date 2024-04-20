import { z } from "zod";

export type InsertPermission = z.infer<typeof insertPermissionSchema>;
export const insertPermissionSchema = z.object({
    nome: z.string(),
    insert: z.coerce.number(),
    update: z.coerce.number(),
    delete: z.coerce.number(),
    view: z.coerce.number(),
})