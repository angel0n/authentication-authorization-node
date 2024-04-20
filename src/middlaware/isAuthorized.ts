import { NextFunction, Request, Response } from "express";
import { PermissionsValid } from "../enuns/Permissions.enum";
import { PermissionsActions } from "../enuns/PermissionsActions.enum";
import { RuleRepository } from "../database/repository/RuleRepository";

export function isAuthorized(req: Request, res: Response, next: NextFunction, permissionRequired: PermissionsValid, actionRequired: PermissionsActions){
    const header = req.headers["rule"];
    if(header == null){
        return res.status(401).json({ mensagem: "Permissões de usuario não encontrada!" } );
    }

    const ruleJson = JSON.parse(header.toString());
    const rule = new RuleRepository().createOne(ruleJson);

    var authorization = false;
    rule.permissions?.map(permission =>{
        if(permission.nome.toUpperCase() == permissionRequired.toString()){
            switch (actionRequired) {
                case PermissionsActions.INSERT:
                    if(permission.insert == 1) authorization = true;
                    break;
                case PermissionsActions.DELETE:
                    if(permission.delete == 1) authorization = true;
                    break;
                case PermissionsActions.UPDATE:
                    if(permission.update == 1) authorization = true;
                    break;
                case PermissionsActions.VIEW:
                    if(permission.view == 1) authorization = true;
                    break;
                default:
                    authorization = false;
                    break;
            }
        }
    });
    
    if(authorization){
        next();
    }else{
        return res.status(401).json({ mensagem: "Usúario não possui permissão para a ação selecionada!" } );
    }
}