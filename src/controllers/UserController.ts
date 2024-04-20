import { Request, Response } from "express";
import { insertUserSchema, loginUserSchema, updateUserSchema } from "../schemas/userSchemas";
import { BadRequestError } from "../errors/BadRequestError";
import { generateErrorMessage } from "zod-error";
import { formaterErrorZod } from "../errors/FormaterErrorZod";
import { UserServer } from "../servers/UserServer";
import { paginationSchema } from "../schemas/paginationSchema";

export class UserController{

    async saveUser(req: Request, res: Response){
        try {
            const userSchema = insertUserSchema.safeParse(req.body);
            if(!userSchema.success){
                const errors = generateErrorMessage(userSchema.error.issues, formaterErrorZod);
                throw new BadRequestError(errors);
            }

            const user = userSchema.data;
            await new UserServer().saveUser(user);
            return res.status(201).send()
        } catch (error: any) {
            return res.status(error.status ?? 500).json({ mensagem: error.message ?? error.toString() });
        }
    }

    async loginUser(req: Request, res: Response){
        try {
            const loginSchema = loginUserSchema.safeParse(req.body);
            if(!loginSchema.success){
                const errors = generateErrorMessage(loginSchema.error.issues, formaterErrorZod);
                throw new BadRequestError(errors);
            }

            const login = loginSchema.data;
            const token = await new UserServer().loginUser(login);
            return res.status(200).json({ token })
        } catch (error: any) {
            return res.status(error.status ?? 500).json({ mensagem: error.message ?? error.toString() });
        }
    }

    async updateUser(req: Request, res: Response){
        try {
            const updateUser = updateUserSchema.safeParse(req.body)
            if(!updateUser.success){
                const errors = generateErrorMessage(updateUser.error.issues, formaterErrorZod);
                throw new BadRequestError(errors);
            }

            const user = updateUser.data;
            await new UserServer().updateUser(user);

            return res.status(201).send();
        } catch (error: any) {
            return res.status(error.status ?? 500).json({ mensagem: error.message ?? error.toString() });
        }
    }

    async getUsers(req: Request, res: Response){
        try {
            const pagination = paginationSchema.safeParse(req.params)
            if(!pagination.success){
                const errors = generateErrorMessage(pagination.error.issues, formaterErrorZod);
                throw new BadRequestError(errors);
            }

            const users = await new UserServer().getUsers(pagination.data);
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(error.status ?? 500).json({ mensagem: error.message ?? error.toString() });
        }
    }
}