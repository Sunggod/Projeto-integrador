import { baseCommum } from './../models/index';
import { FileRepository } from '../../database/FileRepository';
import { IUserCommumService } from '../interfaces';
import { UserCommum } from '../models';
import { UserCommumDto } from '../dto';

export class UserComumnService implements IUserCommumService{
    private fileRepo!: FileRepository
    constructor() {}
    public async init(): Promise<void> {
        this.fileRepo = await FileRepository.getInstance();
    }
    
    async createUserCommum(userDto: UserCommumDto, storeId: string): Promise<UserCommum> {
        const stores = this.fileRepo.getStores();
        console.log('Lojas disponíveis:', stores);
        console.log('ID fornecido:', storeId);
        
        const store = stores.find(store => store.id.trim() === storeId.trim());
        if (!store) {
            throw new Error('Loja não encontrada!');
        }
        
        const user: baseCommum = {
            name: userDto.name!,
            email: userDto.email!,
            password: userDto.password!,
            storeId: storeId,
            age: userDto.age,
            pictureImage: userDto.pictureImage!,
            cart: userDto.cart! || [],
            adress: userDto.adress!,
        };
    
        const newUser = new UserCommum(user);
    
        store.userCommum = store.userCommum || [];
        store.userCommum.push(newUser);
    
        await this.fileRepo.addUserComumm(newUser);
        return newUser;
    }
    

    async getAllUserCommum(storeId: string): Promise<UserCommum[]> {
        return this.fileRepo.getUsersComumm(storeId);
    }
    
    async getUserCommumById(userId: string, storeId: string): Promise<UserCommum | null> {
        const user = this.fileRepo.getUsersComummById(userId, storeId);
        if (!user) {
            console.log("Usuário não encontrado!");
            return null;
        }
        console.log(`Usuário encontrado: Nome: ${user.name}, Idade: ${user.age}, ID: ${user.id}`);
        return user;
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
async deleteUserCommum(userId: string, storeId: string, ownerId: string): Promise<void> {
    const owner = this.fileRepo.getUsers().find(user => user.id === ownerId);
    if (!owner) throw new Error("Usuário não encontrado!");

    const stores = this.fileRepo.getStores();
    const storeIndex = stores.findIndex(store => store.id === storeId);
    if (storeIndex === -1) throw new Error("Loja não encontrada!");

    const principalStore = stores[storeIndex];
    const userCommumIndex = principalStore.userCommum?.findIndex((user) => user.id === userId);
    if (userCommumIndex === undefined || userCommumIndex < 0) throw new Error("Usuário não encontrado na loja!");

    // Remove do store.userCommum
    principalStore.userCommum?.splice(userCommumIndex, 1);

    // Remove globalmente de usersCommum
    const globalIndex = this.fileRepo['data'].usersCommum.findIndex(user => user.id === userId);
    if (globalIndex !== -1) this.fileRepo['data'].usersCommum.splice(globalIndex, 1);

    await this.fileRepo.saveChanges();
}

}