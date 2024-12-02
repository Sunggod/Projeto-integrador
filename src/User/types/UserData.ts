import { Store } from "../../Store/model"
export type UserData = {
    name:string
    age:number
    email:string
    password:string
    stores?:Store[]
    id?: string
    createdAt?:Date
    updatedAt?:Date
    avatarUrl?:string
}