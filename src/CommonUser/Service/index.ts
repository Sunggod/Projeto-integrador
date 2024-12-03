import { baseCommum } from './../models/index';
import { FileRepository } from '../../database/FileRepository';
import { IUserCommumService } from '../interfaces';
import { UserCommum } from '../models';
import { UserCommumDto } from '../dto';

export class UserComumnService implements IUserCommumService{
    private fileRepo!: FileRepository
    constructor(){}
    private async init(): Promise <void>{
        this.fileRepo = await FileRepository.getInstance()
    }
    async createUserCommum(userDto: UserCommumDto, storeId:string): Promise<UserCommum> {
        const store = this.fileRepo.getStores().find(store => store.id === storeId);
        if(store == null){
            throw new Error("Loja não encontrada!");
        }
        const user: baseCommum = {
            name: userDto.name!,
            email: userDto.email!,
            password: userDto.password!,
            storeId: storeId,
            age: userDto.age ,
            pictureImage: userDto.pictureImage!,
            cart: userDto.cart!,
            adress: userDto.adress!,
        };
        const newUser = new UserCommum(user)
        await this.fileRepo.addUserComumm(newUser);
        return newUser;
    }
    async getAllUserCommum(storeId:string): Promise<void> {
        this.fileRepo.getUsersComumm(storeId)
    }
    async getUserCommumById(userId:string, storeId:string): Promise<void> {
        const getUser = this.fileRepo.getUsersComummById(userId, storeId)
        return console.log(`usuario retornado:\bNome:${getUser?.name}\nIdade:${getUser?.age},\nId:${getUser?.id}`)
    }
   async updateUserCommum(userId: string, storeId: string, updateUserCommum: Partial<UserCommum>): Promise<void> {
            const userinfo = this.fileRepo.getUsersComummById(userId,storeId)
         const stores = this.fileRepo.getStores()

         const storeIndex = stores.findIndex(store => store.id === storeId);
         if(storeIndex === -1){
            throw new Error("Loja não encontrada")
         }

         const principalStore = stores[storeIndex]
         const userCommumIndex = principalStore.userCommum?.findIndex(userCommum => userCommum.id === userId)
         if(userCommumIndex === -1){
            throw new Error("User não encontrado!");
         }

         const updatedUserCommum = { ...principalStore.userCommum![userCommumIndex!], ...updateUserCommum };
         principalStore.userCommum![userCommumIndex!] = updatedUserCommum;
         await this.fileRepo.saveChanges();
         return  console.log(`Informações do usuario: ${userinfo?.name} atualizado com sucesso!\n
            Novas Informações: ${updateUserCommum}
            `)
}
    async deleteUserCommum(userId: string, storeId: string, ownerId:string): Promise<void> {
        const owner = this.fileRepo.getUsers().find(user => user.id === ownerId);
        if (!owner) throw new Error("Usuário não encontrado!");
        
        
        const stores = this.fileRepo.getStores();
        const storeIndex = this.fileRepo.getStores().findIndex(store => store.id === storeId)
        
        if(storeIndex === -1 ){
            throw new Error("Loja não encontrada!");
        }

        const principalStore  = stores[storeIndex]
        const userCommumIndex = principalStore.userCommum?.findIndex((user)=> user.id === userId)
        principalStore.userCommum?.splice(userCommumIndex!, 1)
    }
}