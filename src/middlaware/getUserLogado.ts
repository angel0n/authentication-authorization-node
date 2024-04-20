import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { envs } from "../schemas/envSchema";

export function getUserLogado(req: Request, res: Response, next: NextFunction){
    const token = req.headers['authorization'];
    if(token == null) return res.status(401).json({ mensagem: "token de validação não informado!" } );
    
    var payload: any = null;
    try{
        jwt.verify(token,envs.JWTPRIVATEKEY);
        payload = jwt.decode(token);
    }catch(error){
        return res.status(401).json({ mensagem: "Token invalido. Realize login novamente!" } );
    }

    if(payload == null){
        return res.status(401).json({ mensagem: "Token invalido. Realize login novamente!" } );
    }

    req.headers["userId"] = payload.id.toString();
    req.headers["rule"] = JSON.stringify(payload.rule);

    next();
}