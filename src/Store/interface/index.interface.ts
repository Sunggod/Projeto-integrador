import { User } from "../../User/model";
import { Store } from "../model";
import { StoreDTO } from './../dto/index';

export interface IStoreService{
    getStoreById(storeId:string): Promise<Store>;
    getStoreList(): Promise<Store[]>;
    createStore(Store: StoreDTO, owner:User["id"] ): Promise<Store>;
    updateStore(storeId: string ,owner:User["id"], updateStore:Partial<Store>): Promise<void>;
    deleteStore(storeId: string,  ownerId:User["id"]): Promise<void>;
}