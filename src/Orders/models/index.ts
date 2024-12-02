import { BaseEntry } from "../../base";
import { Product } from "../../Product/model/product";
import { User } from "../../User/model";
import { OrderStatus } from "../enums/order-status-enum";

export class Order extends BaseEntry {
    user: User["id"];
    products: Product[];
    totalPrice: number;
    status: OrderStatus; 

    constructor(user: User["id"], products: Product[], totalPrice: number) {
        super();
        this.user = user;
        this.products = products;
        this.totalPrice = totalPrice;
        this.status = OrderStatus.PROCESSING; 
    }
}
