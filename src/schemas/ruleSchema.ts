import { z } from "zod";
import { insertPermissionSchema } from "./permissionSchema";

export type InsertRule = z.infer<typeof insertRuleSchema>;
export const insertRuleSchema = z.object({
    nome: z.string(),
    descricao: z.string(),
    permissions: z.array(insertPermissionSchema)
})