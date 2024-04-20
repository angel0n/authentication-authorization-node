import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

export class EntitieBase {
    @PrimaryColumn({ name: "id" })
    id?: string;

    @CreateDateColumn({ name: "created" })
    created!: Date;

    @UpdateDateColumn({ name: "updated" })
    updated!: Date;

    public isNew(): boolean{
        return this.id == null
    }
}