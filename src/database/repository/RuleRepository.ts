import { EntityManager, EntityTarget } from "typeorm";
import { Rules } from "../entities/Rule";
import { RepositoryBase } from "./RepositoryBase";
import { AppDataSource } from "../data-source";

export class RuleRepository extends RepositoryBase<Rules>{
    constructor(){
        const target: EntityTarget<Rules> = Rules;
        const manager = new EntityManager(AppDataSource);
        super(target, manager);
    }

    async findOneByName(nome: string){
        return await super.findOneBy({ nome })
    }
}