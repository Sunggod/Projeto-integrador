import { BaseEntry } from "../../base";
import { Product } from "../../Product/model/product";
import { Order } from "../../Orders/models";
import { CartStatus } from "../enums/order-status-enum";
import { Store } from "../../Store/model";
import { baseCart } from "../types";
import { UserCommum } from "../../CommonUser/models";

export class Cart extends BaseEntry {
    products?: Product[];
    totalPrice: number;
    userCart: UserCommum["id"];
    storeId: Store["id"]
    status: CartStatus; 
    order?: Order; 

    constructor(base:baseCart) {
        super(base.id,base.createdAt,base.updatedAt);
        this.products = base.products;
        this.totalPrice = base.totalPrice;
        this.userCart = base.userCart;
        this.status = base.status;
        this.storeId = base.storeId
    }
    validate(): boolean {
        if (this.status !== CartStatus.OPEN) return false; return true
}
}