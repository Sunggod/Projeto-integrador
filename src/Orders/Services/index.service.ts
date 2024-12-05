import { FileRepository } from "../../database/FileRepository";
import { OrderDto } from "../dto";
import { IserviceOrders } from "../interface";
import { Order } from "../models";
import { dataOrders } from "../models"

export class OrderService implements IserviceOrders{
    private fileRepo!:FileRepository;
    constructor(){}
    private async init():Promise <void>{
        this.fileRepo = await FileRepository.getInstance()
   }
   async CreateOrders(Ordersdto: OrderDto, storeId: string): Promise<Order> {
        const stores = this.fileRepo.getStores();
        console.log('Lojas disponíveis:', stores);
        console.log('ID fornecido:', storeId);
        
        const store = stores.find(store => store.id.trim() === storeId.trim());
        if (!store) {
            throw new Error('Loja não encontrada!');
        }
    
       
       const order:dataOrders = {
            userId: Ordersdto.userId,
            products: Ordersdto.products,
            storeId: storeId,
            totalPrice: Ordersdto.totalPrice,
            startDate: Ordersdto.startDate,
            deliveryDate: Ordersdto.deliveryDate,
            DateProcessing: Ordersdto.DataProcessing,
            status: Ordersdto.status
       }

       const newOrder = new Order(order)

       store.order = store.order || [];
       store.order.push(newOrder);
       await this.fileRepo.addOrder(newOrder)
       console.log(`Novo pedido "${newOrder.status}" criado com sucesso!`)
       return newOrder
   }

   async DeleteOrder(orderId:string, storeId: string, ownerId: string): Promise<void>{
        const owner = this.fileRepo.getUsers().find(user => user.id === ownerId);
        if (!owner) throw new Error("Usuário não encontrado!");
        
        
        const stores = this.fileRepo.getStores();
        const storeIndex = this.fileRepo.getStores().findIndex(store => store.id === storeId)
        
        if(storeIndex === -1 ){
            throw new Error("Loja não encontrada!");
        }

        const principalStore = stores[storeIndex];
        const orderIndex = principalStore.order.findIndex((element) => element.id == orderId);
        principalStore.order.splice(orderIndex,1);
        this.fileRepo.saveChanges()
   }
   async UpdateOrders(orderId: string, storeId: string, UpdateOrder: Partial<Order>): Promise<Order> {
    const stores = this.fileRepo.getStores();

    const storeIndex = stores.findIndex(store => store.id === storeId);
    
    if (storeIndex === -1) {
        throw new Error("Loja não encontrada!");
    }

    const principalStore = stores[storeIndex];

    const orderIndex = principalStore.order.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
        throw new Error("Pedido não encontrado!");
    }

    const updatedOrder = { ...principalStore.order[orderIndex], ...UpdateOrder };
    
    principalStore.order[orderIndex] = updatedOrder;

    await this.fileRepo.saveChanges();

    return updatedOrder;
}
} 
