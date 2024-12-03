import { UserCommum } from './../../CommonUser/models/index';
import { BaseEntry } from "../../base";
import { Product } from "../../Product/model/product";
import { Store } from "../../Store/model";
import { User } from "../../User/model";
import { OrderStatus } from "../enums/order-status-enum";
export interface dataOrders{
    userId: UserCommum["id"];
    products: Product[];
    totalPrice: number;
    startDate?:Date;
    deliveryDate?: Date;
    DateProcessing?: Date;
    storeId: Store["id"]
    status: OrderStatus;
    id?:string
    createdAt?:Date
    updatedAt?:Date
}
export class Order extends BaseEntry {
    userId: UserCommum["id"];
    products: Product[];
    storeId: Store["id"]
    totalPrice: number;
    startDate?:Date;
    deliveryDate?: Date;
    DateProcessing?: Date;
    status: OrderStatus; 

    constructor(data:dataOrders) {
        super(data.id, data.createdAt, data.updatedAt);
        this.userId = data.userId;
        this.products = data.products;
        this.storeId = data.storeId
        this.totalPrice = data.totalPrice;
        this.startDate = data.startDate
        this.deliveryDate = data.deliveryDate;
        this.DateProcessing = data.DateProcessing;
        this.status = OrderStatus.PROCESSING; 
    }
    validate?(): boolean {
        if(!this.totalPrice){
            return true
        }
        else
        return false    
}
}
