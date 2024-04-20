import { EventSubscriber } from "typeorm";
import { SubscriberBase } from "./SubscriberBase";
import { Users } from "../entities/User";

@EventSubscriber()
export class UserSubscriber extends SubscriberBase<Users>{
    listenTo() {
        return Users;
    }
}