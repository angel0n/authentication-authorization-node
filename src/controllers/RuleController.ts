import { generateErrorMessage } from "zod-error";
import { insertRuleSchema } from "../schemas/ruleSchema";
import { formaterErrorZod } from "../errors/FormaterErrorZod";
import { BadRequestError } from "../errors/BadRequestError";
import { RuleServer } from "../servers/RuleServer";
import { Request, Response } from "express";
import { paginationSchema } from "../schemas/paginationSchema";

export class RuleController{

    async saveRule(req: Request, res: Response){
        try {
            const ruleSchema = insertRuleSchema.safeParse(req.body);
            if(!ruleSchema.success){
                const errors = generateErrorMessage(ruleSchema.error.issues, formaterErrorZod);
                throw new BadRequestError(errors);
            }

            const rule = ruleSchema.data;
            await new RuleServer().saveRule(rule);
            res.status(201).send()
        } catch (error: any) {            
            return res.status(error.status ?? 500).json({ mensagem: error.message ?? error.toString() });
        }
    }

    async getRules(req: Request, res: Response){
        try {
            const pagination = paginationSchema.safeParse(req.params)
            if(!pagination.success){
                const errors = generateErrorMessage(pagination.error.issues, formaterErrorZod);
                throw new BadRequestError(errors);
            }

            const rules = await new RuleServer().getRules(pagination.data);
            return res.status(200).json(rules);
        } catch (error: any) {
            return res.status(error.status ?? 500).json({ mensagem: error.message ?? error.toString() });
        }
    }
}