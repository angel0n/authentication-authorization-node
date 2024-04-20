import { RuleRepository } from "../database/repository/RuleRepository";
import { PermissionsValid } from "../enuns/Permissions.enum";
import { BadRequestError } from "../errors/BadRequestError";
import { Pagination } from "../schemas/paginationSchema";
import { InsertRule } from "../schemas/ruleSchema";

export class RuleServer{
    private ruleRepository: RuleRepository;

    constructor(){
        this.ruleRepository = new RuleRepository();
    }

    async saveRule(ruleInsert: InsertRule){
        const rule = await this.ruleRepository.findOneByName(ruleInsert.nome);
        if(rule != null) throw new BadRequestError("Já existe uma regra de permissão com esse nome!");

        const entity = this.ruleRepository.create(ruleInsert)

        if(entity.permissions != null && entity.permissions.length > 0){
            entity.permissions.forEach(permission=>{
                if(permission.nome.toString().toLowerCase() != PermissionsValid.USER.toString().toLowerCase()){
                    throw new BadRequestError(`A permissão ${permission.nome} não é valida`); 
                }
                permission.rule = entity
            })
        }        
        await this.ruleRepository.save(entity);
    }

    async getRules(pagination: Pagination){
        const skip = pagination.limit * (pagination.page - 1)
        return this.ruleRepository.find({ skip, take: pagination.limit})
    }
}