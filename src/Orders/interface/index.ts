import { OrderDto } from "../dto"
import {Order} from "../models"

export interface IserviceOrders{
    UpdateOrders(orderId:string, storeId: string, UpdateOrder:Partial<Order>): Promise<Order>
    CreateOrders(Ordersdto:OrderDto, storeId: string): Promise<Order>
    DeleteOrder(orderId:string,storeId: string, OwnerId: string): Promise<void> 
}