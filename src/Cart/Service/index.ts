import { OrderStatus } from './../../Orders/enums/order-status-enum';
import { FileRepository } from '../../database/FileRepository';
import { ICartService } from './../interface/index';
import { Cart } from '../models';
import { CartStatus } from '../enums/order-status-enum';
import { Product } from "../../Product/model/product";
import { Order } from "../../Orders/models";

export class CartService implements ICartService {
    private fileRepo!: FileRepository;

    constructor() {}

    private async init(): Promise<void> {
        this.fileRepo = await FileRepository.getInstance();
    }

    private async getOrCreateCart(userId: string, storeId: string): Promise<Cart> {
        let userCommum = this.fileRepo.getUsersComummById(userId, storeId);
        let cart = userCommum?.cart;

        if (!cart || cart.status !== CartStatus.OPEN) {
            cart = await this.createCart(userId, storeId);
        }

        return cart;
    }

    public async createCart(userId: string, storeId: string): Promise<Cart> {
        const newCart = new Cart({
            userCart: userId,
            storeId: storeId,
            status: CartStatus.OPEN,
            totalPrice: 0,
            products: []
        });

        let userCommum = this.fileRepo.getUsersComummById(userId, storeId);
        if (userCommum) {
            userCommum.cart = newCart;
            await this.fileRepo.saveChanges();
        }

        return newCart;
    }

    async addProductToCart(userId: string, storeId: string, product: Product): Promise<Cart> {
        const cart = await this.getOrCreateCart(userId, storeId);

        cart.products?.push(product);
        cart.totalPrice += product.price;
        cart.updatedAt = new Date();

        await this.fileRepo.saveChanges();
        return cart;
    }

    async removeProductFromCart(userId: string, storeId: string, productId: string): Promise<Cart> {
        const cart = await this.getOrCreateCart(userId, storeId);

        const productIndex = cart.products?.findIndex(p => p.id === productId);

        if (productIndex !== -1) {
        const removedProduct = cart.products?.splice(productIndex!, 1)[0];
            cart.totalPrice -= removedProduct!.price;
            cart.updatedAt = new Date();

            await this.fileRepo.saveChanges();
        }

        return cart;
    }

    async checkoutCart(userId: string, storeId: string): Promise<Cart> {
        const cart = await this.getOrCreateCart(userId, storeId);
        if (cart.status !== CartStatus.OPEN) {
            throw new Error('Carrinho não está aberto');
        }
    
        cart.status = CartStatus.CHECKED_OUT;
        cart.updatedAt = new Date();
        cart.order!.status = OrderStatus.PENDING

        const products = cart.products ?? []; 
    
        const order = new Order({
            userId,
            storeId,
            products: products,
            totalPrice: cart.totalPrice,
            status: cart.order!.status 
        })
    
        cart.order = order;
    
        await this.fileRepo.addOrder(order);
        await this.fileRepo.saveChanges();
    
        return cart;
    }
    
}
