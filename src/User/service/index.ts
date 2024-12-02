import { FileRepository } from "../../database/FileRepository";
import { UserDto } from "../dto";
import { IUserService } from "../interface";
import { User } from "../model";
import { UserData } from "../types/UserData";

export class UserService implements IUserService{
    private filerespo!: FileRepository;
    constructor(){}
    async init(): Promise<void>{
         this.filerespo = await FileRepository.getInstance();
    }

    async createUser(userDto: UserDto): Promise<User> {
        const user:UserData = {
            name:userDto.name!,
            age:userDto.age,
            email:userDto.email!,
            password:userDto.password!,
            avatarUrl:userDto.avatarUrl!,
            stores:userDto.stores!,
        }
        
        const newUser = new User(user)
        this.filerespo.addUser(newUser)
        this.filerespo.saveChanges()
        console.log(`Novo usuario criado! Bem vindo ${newUser.name}`)
        return newUser
    }



    async updateUser(userId: User["id"], updatedData: Partial<User>): Promise<void> {
        const users = await this.filerespo.getUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            throw new Error("User not found");
        }
    
        users[userIndex] = {
            ...users[userIndex], 
            ...updatedData
        };  
    
        await this.filerespo.addUser(users[userIndex]);
        await this.filerespo.saveChanges();  

}
    async deleteUser(id: User["id"]): Promise<void> {
        const users = this.filerespo.getUsers();
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new Error("User not found");
        }
        
        users.splice(userIndex, 1);
        await this.filerespo.saveChanges();  
    }
    async getAllUsers(): Promise<User[]> {
        return this.filerespo.getUsers();
    }    
    async getUserById(id: string): Promise<User> {
        const user = this.filerespo.getUsers().find(users => users.id === id)
        if(!user){
            throw new Error("User not found");
        }
        return user;
    }
    
}