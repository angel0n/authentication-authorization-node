import { ErrorBase } from "./ErrorBase";

export class UnauthorizedError extends ErrorBase{
    constructor(mensagem: string){
        super(401, mensagem)
    }
}