import { UserCommum } from "../../CommonUser/models";
import { CartDTO } from "../dto";
import { Cart } from "../models";

export interface ICartService{
     createCart(id: string, storeId: string): Promise<Cart>
}