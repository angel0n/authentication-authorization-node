import { EventSubscriber } from "typeorm";
import { SubscriberBase } from "./SubscriberBase";
import { Permissions } from "../entities/Permission";

@EventSubscriber()
export class PermissionSubscriber extends SubscriberBase<Permissions>{
    listenTo() {
        return Permissions;
    }
}