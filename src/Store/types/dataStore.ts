import { Employees } from "../../Employees/model"
import { Product } from "../../Product/model/product"
import { User } from "../../User/model"
import { Adress } from "../interface/adress.interface"

export type DataStore = {
    name:string
    adress:Adress[]
    owner:User["id"]
    openingHours:Date
    closingTime:Date  
    imageBannerUrl?:string
    imageLogoUrl?:string                                                                              
    employees?:Employees[]
    products?:Product[]
    id?: string
    createdAt?:Date
    updatedAt?:Date
}