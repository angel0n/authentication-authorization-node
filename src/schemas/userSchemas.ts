import { z } from "zod";

export type InsertUser = z.infer<typeof insertUserSchema>;
export const insertUserSchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string(),
    senhaConfirme: z.string(),
    cargo: z.string(),
    nomeUsuario: z.string(),
    rule: z.string().uuid(),
})

export type LoginUser = z.infer<typeof loginUserSchema>
export const loginUserSchema = z.object({
    email: z.string(),
    senha: z.string()
})

export type updateUser = z.infer<typeof updateUserSchema>
export const updateUserSchema = z.object({
    id: z.string().uuid(),
    nome: z.string().optional(),
    email: z.string().optional(),
    cargo: z.string().optional(),
    nomeUsuario: z.string().optional(),
})