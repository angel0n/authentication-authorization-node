import { NextFunction, Request, Response, Router } from "express";
import { RouterBase } from "./RouterBase";
import { RuleController } from "../controllers/RuleController";
import { getUserLogado } from "../middlaware/getUserLogado";
import { isAuthorized } from "../middlaware/isAuthorized";
import { PermissionsValid } from "../enuns/Permissions.enum";
import { PermissionsActions } from "../enuns/PermissionsActions.enum";

export class RuleRouters implements RouterBase{
    private ruleController: RuleController;
    routers: Router;

    constructor(){
        this.ruleController = new RuleController();
        this.routers = Router();
        this.posts();
        this.puts();
        this.gets();
        this.deletes();
    }

    posts(): void {
        this.routers.post("/rule/saveRule", [getUserLogado, (req: Request,res: Response,next: NextFunction)=>isAuthorized(req,res,next,PermissionsValid.RULE, PermissionsActions.INSERT)], this.ruleController.saveRule)
    }
    gets(): void {
        this.routers.get("/rule/getRules/:page/:limit",[getUserLogado, (req: Request,res: Response,next: NextFunction)=>isAuthorized(req,res,next,PermissionsValid.RULE, PermissionsActions.VIEW)], this.ruleController.getRules)
    }
    puts(): void {}
    deletes(): void {}
    
}