import { BaseEntry } from "../../base";
import { Employees } from "../../Employees/model";
import { Order } from "../../Orders/models";
import { User } from "../../User/model";
import { Adress } from "../interface/adress.interface";
import { DataStore } from "../types/dataStore";
import { Product } from './../../Product/model/product';

export class Store extends BaseEntry{
    name!:string
    adress!:Adress[]
    owner!:User["id"]
    openingHours!:Date
    closingTime!:Date  
    order!:Order[]
    imageBannerUrl?:string
    imageLogoUrl?:string                                                                             
    employees?:Employees[]
    products?:Product[] = []
    constructor(data: DataStore )
    {
        super(data.id, data.createdAt)
        this.name = data.name
        this.adress = data.adress
        this.owner = data.owner
        this.openingHours = data.openingHours
        this.closingTime = data.closingTime
        this.imageBannerUrl = data.imageBannerUrl
        this.imageLogoUrl = data.imageLogoUrl
        this.employees = data.employees
        this.products = data.products
    }
    validate?(): boolean {
        return Boolean (this.name && this.adress && this.owner)
    }
    
}