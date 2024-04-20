export class AuthenticationError extends Error{
    public static status: number = 401
    constructor(mensagem:string){
        super(mensagem)
    }
}