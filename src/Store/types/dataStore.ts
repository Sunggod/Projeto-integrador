import { Employees } from "../../Employees/model"
import { Product } from "../../Product/model/product"
import { User } from "../../User/model"
import { Adress } from "../interface/adress.interface"
import { Order } from "../../Orders/models"
import { UserCommum } from "../../CommonUser/models"

export type DataStore = {
    name:string
    adress:Adress[]
    owner:User["id"]
    openingHours:Date
    closingTime:Date  
    imageBannerUrl?:string
    imageLogoUrl?:string    
    orders?:Order[]                                                                          
    employees?:Employees[]
    products?:Product[]
    userCommum?:UserCommum[]
    id?: string
    createdAt?:Date
    updatedAt?:Date
}