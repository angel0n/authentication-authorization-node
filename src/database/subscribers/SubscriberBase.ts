import { EntitySubscriberInterface, InsertEvent } from "typeorm";
import { EntitieBase } from "../entities/EntitieBase";
import { v4 } from "uuid";

export class SubscriberBase<T extends EntitieBase> implements EntitySubscriberInterface<T> {
    listenTo(): any {
        return null;
    }
    
    beforeInsert(event: InsertEvent<T>) {
        if(event.entity.isNew()){
            event.entity.id = v4();
        }
    }
}