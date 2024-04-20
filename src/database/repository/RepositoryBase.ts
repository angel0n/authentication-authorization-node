import { DeepPartial, Repository } from "typeorm";
import { EntitieBase } from "../entities/EntitieBase";

export class RepositoryBase<T extends EntitieBase> extends Repository<T>{
    createOne(entity: DeepPartial<T>): T{
        return super.create(entity);
    };
}