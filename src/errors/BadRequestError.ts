import { ErrorBase } from "./ErrorBase";

export class BadRequestError extends ErrorBase{
    constructor(mensagem: string){
        super(400, mensagem)
    }
}