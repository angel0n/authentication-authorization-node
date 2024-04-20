import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from "typeorm";
import { EntitieBase } from "./EntitieBase";
import { Rules } from "./Rule";

@Entity()
export class Users extends EntitieBase{

    @Column({ name: "nome", nullable: false, })
    nome!: string;

    @Column({ name: "email", nullable: false, unique: true})
    email!: string;

    @Column({ name: "senha", nullable: false, })
    senha!: string;

    @Column({ name: "cargo", nullable: false, })
    cargo!: string;

    @Column({ name: "nomeusuario", nullable: false, })
    nomeUsuario!: string;

    @ManyToOne(()=> Rules, rule=> rule.users)
    rule!: Rules
}