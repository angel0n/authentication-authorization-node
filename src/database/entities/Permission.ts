import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from "typeorm";
import { EntitieBase } from "./EntitieBase";
import { Rules } from "./Rule";

@Entity()
export class Permissions extends EntitieBase{

    @Column({ name: "nome", nullable: false })
    nome!: string;

    @Column({ name: "insert", nullable: false, default: 0})
    insert!: number;

    @Column({ name: "update", nullable: false, default: 0 })
    update!: number;

    @Column({ name: "delete", nullable: false, default: 0 })
    delete!: number;

    @Column({ name: "view", nullable: false, default: 0 })
    view!: number;

    @ManyToOne(()=> Rules, rules=> rules.permissions)
    rule!: Rules
}