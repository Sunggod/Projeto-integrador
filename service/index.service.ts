import { FileRepository } from "../../database/FileRepository";
import { Order } from "../../Orders/models";
import { User } from "../../User/model";
import { StoreDTO } from "../dto";
import { IStoreService } from "../interface/index.interface";
import { Store } from "../model";
import { DataStore } from "../types/dataStore";
export class StoreService implements IStoreService{
    private fileRepo!: FileRepository;
    constructor(){}
    private async init():Promise <void>{
         this.fileRepo = await FileRepository.getInstance()
    }
    async createStore(storeDTO: StoreDTO, ownerId: User["id"]): Promise<Store>{

        const owner = this.fileRepo.getUsers().find(user => user.id === ownerId);

        if (!owner)throw new Error("Usuário não encontrado!");

        const store:DataStore = {   
            name: storeDTO.name!,
            adress: storeDTO.adress!,
            owner: ownerId, 
            openingHours: storeDTO.openingHours!,
            closingTime: storeDTO.closingTime!,
            imageBannerUrl: storeDTO.imageBannerUrl,
            imageLogoUrl: storeDTO.imageLogoUrl,
            employees: storeDTO.employees,
            products: storeDTO.products,
            orders:storeDTO.orders
        }

        const newStore = new Store(store)

        await this.fileRepo.addStore(newStore)

        console.log(`Nova loja ${newStore.name} criada com sucesso! Dono da loja ${newStore.owner}`)

        return newStore
    }
    async deleteStore(storeId: string, ownerId: User["id"]): Promise<void> {
        const owner = this.fileRepo.getUsers().find(user => user.id === ownerId);
        if (!owner) throw new Error("Usuário não encontrado!");


        const storeIndex = this.fileRepo.getStores().findIndex(store => store.id === storeId && store.owner === ownerId);
        if (storeIndex === -1) throw new Error("Loja não encontrada ou o proprietário não corresponde!");
        const stores = await this.fileRepo.getStores();
        stores.splice(storeIndex, 1);
        console.log(`Loja com o id '${storeId}' foi deletada com sucesso!`);
        await this.fileRepo.saveChanges();  

    }
    async getStoreList(): Promise<Store[]> {
        return  this.fileRepo.getStores()
    }


    async getStoreById(storeId:string): Promise<Store> {
        const index = this.fileRepo.getStores().findIndex(store => store.id === storeId);

        if (index !== -1) return await this.fileRepo.getStores()[index]
        else{
            throw new Error("Loja não encontrada!")
        }
        
    }

    async updateStore(storeId: string, ownerId: User["id"], updateStore: Partial<Store>): Promise<void> {
        const owner = this.fileRepo.getUsers().find(user => user.id === ownerId);

        if (!owner)throw new Error("Usuário não encontrado!");

        const storeIndex = this.fileRepo.getStores().findIndex(store => store.id === storeId && store.owner === ownerId);
        if (storeIndex === -1) throw new Error("Loja não encontrada ou o proprietário não corresponde!");

        const stores = this.fileRepo.getStores();
        const index = stores.findIndex(store => store.id === storeId);

        if (index === -1)throw new Error("Loja não encontrada!");
        stores[index] = { ...stores[index], ...updateStore };
        await this.fileRepo.addStore(stores[index]);
        await this.fileRepo.saveChanges();  
        console.log(`Loja com o id '${storeId}' foi atualizada com sucesso!`);
    }
}