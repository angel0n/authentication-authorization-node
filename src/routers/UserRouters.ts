import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";
import { RouterBase } from "./RouterBase";
import { getUserLogado } from "../middlaware/getUserLogado";
import { isAuthorized } from "../middlaware/isAuthorized";
import { PermissionsValid } from "../enuns/Permissions.enum";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { PermissionsActions } from "../enuns/PermissionsActions.enum";

export class UserRouters implements RouterBase{

    private userController: UserController;
    routers: Router;

    constructor(){
        this.userController = new UserController();
        this.routers = Router();
        this.posts();
        this.puts();
        this.gets();
        this.deletes();
    }
    gets(){
        this.routers.get('/user/getUsers/:page/:limit', [getUserLogado, (req: Request,res: Response,next: NextFunction)=>isAuthorized(req,res,next,PermissionsValid.USER, PermissionsActions.VIEW)],this.userController.getUsers)
    }
    deletes(){}
    posts(){
        this.routers.post('/user/saveUser',[getUserLogado, (req: Request,res: Response,next: NextFunction)=>isAuthorized(req,res,next,PermissionsValid.USER, PermissionsActions.INSERT)], this.userController.saveUser)
        this.routers.post('/user/loginUser', this.userController.loginUser)
    }
    puts(){
        this.routers.put('/user/updateUser', [getUserLogado, (req: Request,res: Response,next: NextFunction)=>isAuthorized(req,res,next,PermissionsValid.USER, PermissionsActions.UPDATE)], this.userController.updateUser)
    }
}