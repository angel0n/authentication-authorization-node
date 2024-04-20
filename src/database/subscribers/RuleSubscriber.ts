import { EventSubscriber } from "typeorm";
import { SubscriberBase } from "./SubscriberBase";
import { Rules } from "../entities/Rule";

@EventSubscriber()
export class RuleSubscriber extends SubscriberBase<Rules>{
    listenTo() {
        return Rules;
    }
}