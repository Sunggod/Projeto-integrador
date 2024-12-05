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
    async getProductById(storeId: string, productId: string): Promise<Product | undefined> {
        const store = this.fileRepo.getStores().find(store => store.id === storeId);
        if (store) {
            return store.products?.find(product => product.id === productId);
        }
        return undefined;
    }
    
    async checkoutCart(userId: string, storeId: string): Promise<Cart> {
        const cart = await this.getOrCreateCart(userId, storeId);
        if (cart.status !== CartStatus.OPEN) {
            throw new Error('Carrinho não está aberto');
        }
    
        // Inicializar o campo order caso ele não exista
        if (!cart.order) {
            cart.order = new Order({
                userId,
                storeId,
                products: [],
                totalPrice: 0,
                status: OrderStatus.PENDING, // O status já é PENDING por padrão
            });
        }
    
        cart.status = CartStatus.CHECKED_OUT;
        cart.updatedAt = new Date();
        
        // Modificar o status da ordem
        cart.order.status = OrderStatus.PENDING;
    
        const products = cart.products ?? [];
    
        // Atualizar a ordem com os produtos e o preço total
        cart.order.products = products;
        cart.order.totalPrice = cart.totalPrice;
    
        await this.fileRepo.addOrder(cart.order); // Adiciona a ordem
        await this.fileRepo.saveChanges(); // Salva todas as alterações no repositório
    
        return cart;
    }
    
    
}
