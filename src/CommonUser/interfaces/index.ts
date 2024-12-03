import { UserCommumDto } from "../dto"
import { UserCommum } from "../models"

export interface IUserCommumService{
    createUserCommum(dataDto:UserCommumDto,storeId:string): Promise<UserCommum>
    updateUserCommum(userId:string,storeId:string, updateUserCommum: Partial<UserCommum>): Promise<void>
    deleteUserCommum(userId:string, storeId:string,  owner:string): Promise<void> 
    getAllUserCommum(storeId:string):Promise<void>
    getUserCommumById(userId:string, storeId:string):Promise<void>
}