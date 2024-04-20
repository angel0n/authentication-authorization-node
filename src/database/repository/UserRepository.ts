import { EntityManager, EntityTarget } from "typeorm";
import { BadRequestError } from "../../errors/BadRequestError";
import { Users } from "../entities/User";
import { RepositoryBase } from "./RepositoryBase";
import { AppDataSource } from "../data-source";
import { Rules } from "../entities/Rule";

export class UserRepository extends RepositoryBase<Users>{
    constructor(){
        const target: EntityTarget<Users> = Users;
        const manager = new EntityManager(AppDataSource);
        super(target, manager);
    }
    async findByEmail(email: string): Promise<Users | null>{
        if(email == null || email.length == 0) throw new BadRequestError("O e-mail não foi informado!");
        return await super.findOneBy({ email }) 
    }

    async getRule(userId: string): Promise<Rules | null>{
        const user = await super.findOne({ relations: { rule: true }, where: { id: userId } })        
        if(user == null) return null;
        return user.rule
    }
}