import { Order } from "../../Orders/models";
import { Product } from "../../Product/model/product";
import { Store } from "../../Store/model";
import { User } from "../../User/model";
import { CartStatus } from "../enums/order-status-enum";

export type baseCart ={
    products?: Product[];
    totalPrice: number;
    userCart: User["id"];
    storeId: Store["id"]
    status: CartStatus.OPEN;
    order?: Order;
    id?:string;
    createdAt?:Date;
    updatedAt?:Date;
}