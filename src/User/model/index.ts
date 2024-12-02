import { BaseEntry } from "../../base";
import { Store } from "../../Store/model";
import { UserData } from "../types/UserData";

export class User extends BaseEntry{
    name!:string
    age!:number
    password!:string
    email!:string
    stores?:Store[]
    avatarUrl?:string
    constructor(data:UserData){
    super(data.id ?? undefined, data.createdAt, data.updatedAt); 
    this.name = data.name
    this.age = data.age
    this.email = data.email
    this.stores = data.stores
    }
    validate?(): boolean {
        return true
    }
}