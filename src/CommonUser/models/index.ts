import { BaseEntry } from "../../base";
import { Cart } from "../../Cart/models";
import { Adress } from "../../Store/interface/adress.interface";

export interface baseCommum{
    name:string;
    email:string;
    password:string;
    storeId:string;
    age?: number;
    adress?:Adress;
    pictureImage?:string;
    cart?:Cart;
    id?:string;
    createdAt?:Date
    updatedAt?:Date
}
export class UserCommum extends BaseEntry{
    name:string;
    email:string;
    password:string;
    storeId:string;
    age?: number;
    adress?:Adress;
    pictureImage?:string;
    cart?:Cart;
    constructor(data:baseCommum){
        super(data.id ?? undefined, data.createdAt, data.updatedAt)
        this.name = data.name
        this.email = data.email
        this.password = data.password
        this.storeId = data.storeId
        this.age = data.age
        this.adress = data.adress
        this.pictureImage = data.pictureImage
        this.cart = data.cart
    }
    validate?(): boolean {
        if (!this.name){
            return false; 
        }else{
            return false
        }
    }
}