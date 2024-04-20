import { Column, Entity, JoinTable, OneToMany } from "typeorm";
import { EntitieBase } from "./EntitieBase";
import { Users } from "./User";
import { Permissions } from "./Permission";

@Entity()
export class Rules extends EntitieBase{

    @Column({ name: "nome", nullable: false})
    nome!: string;

    @Column({ name: "descricao", nullable: false})
    descricao!: string;

    @OneToMany(()=> Users, user=> user.rule)
    users!: Array<Users>

    @OneToMany(()=> Permissions, permissions=> permissions.rule, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE", eager: true })
    permissions?: Array<Permissions>
}