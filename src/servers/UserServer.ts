import { DeepPartial } from "typeorm";
import { InsertUser, LoginUser, updateUser } from "../schemas/userSchemas";
import { Users } from "../database/entities/User";
import { BadRequestError } from "../errors/BadRequestError";
import bcrypt from 'bcrypt';
import { envs } from "../schemas/envSchema";
import { UserRepository } from "../database/repository/UserRepository";
import { UnauthorizedError } from "../errors/Unauthorized";
import jwt from "jsonwebtoken";
import { Pagination } from "../schemas/paginationSchema";

export class UserServer{
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    async saveUser(userInsert: InsertUser){
        if(userInsert.senha != userInsert.senhaConfirme) throw new BadRequestError("As senhas não são são iguais!");
        
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]$/;
        if(regex.test(userInsert.senha)) throw new BadRequestError("A senha não é valida, precisa conter maiuscula, minuscula, número e simbolo ");

        const senha = bcrypt.hashSync(userInsert.senha,envs.BCRIPTPASSWORDSALT);

        const user = this.userRepository.create(userInsert as DeepPartial<Users>);
        user.senha = senha;  
        
        const userExist = await new UserRepository().findByEmail(user.email)
        if(userExist != null)  throw new BadRequestError("O E-mail já esta sendo usado!") 

        await this.userRepository.save(user);
    }

    async loginUser(login: LoginUser): Promise<string>{
        const senha = bcrypt.hashSync(login.senha,envs.BCRIPTPASSWORDSALT);

        const user = await this.userRepository.findByEmail(login.email);

        if(user == null || user.senha != senha) throw new UnauthorizedError("Usúario não localizado!");

        const rule = await this.userRepository.getRule(user.id!);
        
        if(rule == null) throw new BadRequestError("O Usúario não possui uma regra de permissões!");

        return jwt.sign({ id: user.id, rule: { nome: rule.nome, permissions: rule.permissions } }, envs.JWTPRIVATEKEY, { expiresIn: "1h" });
    }

    async updateUser(updateUser: updateUser): Promise<void> {
        const user = await this.userRepository.findOneBy({ id: updateUser.id});
        if(user == null) throw new UnauthorizedError("Usúario não localizado!");

        if(updateUser.nome != null) user.nome = updateUser.nome;
        if(updateUser.nomeUsuario != null) user.nomeUsuario = updateUser.nomeUsuario;
        if(updateUser.email != null) user.email = updateUser.email;
        if(updateUser.cargo != null) user.cargo = updateUser.cargo;

        await this.userRepository.save(user);
    }

    async getUsers(pagination: Pagination): Promise<Array<Users>>{
        const skip = pagination.limit * (pagination.page - 1);
        return await this.userRepository.find({ skip, take: pagination.limit })
    }
}