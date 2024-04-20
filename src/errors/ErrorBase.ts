export class ErrorBase extends Error{
    private status: number;
    constructor(status: number, mensagem: string){
        super(mensagem);
        this.status = status;
    }
}