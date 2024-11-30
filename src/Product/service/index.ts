import { Promotion } from "../../Promotion/model";
import { CreateProductDto } from "../dtos/product.dto";
import { IProductService } from "../interfaces";
import { Product } from "../model/product";

export class ProductService implements IProductService {
    private products: Product[] = [];
    private promotions: Promotion[] = [];

     create(productDto: CreateProductDto): void {
        const product = new Product(
            productDto.name,
            productDto.price,
            productDto.stock,
            productDto.mark,
            productDto.storeId,
            'ativo', 
            productDto.expiryDate,
            productDto.urlImage,
            productDto.factoryValue!,
            productDto.promotion,
            undefined,  
        );

        if (productDto.promotion == true && !product.promotionActive) {
            const promotion = new Promotion(
                productDto.promotionTitle!,         
                productDto.promotionDescription!,   
                productDto.promotionBanners!, 
                productDto.promotionType!,      
                productDto.discountPercentage!,    
                product.id,                         
            );

            this.promotions.push(promotion);

            product.promotionActive = promotion;

            product.price = product.price - (product.price * (promotion.discountPercentage / 100));
            console.log(`Desconto de ${promotion.discountPercentage}% aplicado ao produto ${product.name}`);
        }

        this.products.push(product);
        console.log(`Produto ${product.name} criado com sucesso!`);
    }

    findById(id: string): Product | null {
        return this.products.find((product) => product.id === id) || null;
    }

    delete(id: string): void {
        this.products = this.products.filter((product) => product.id !== id);
        console.log(`Produto com o id '${id}' foi deletado com sucesso!`);
    }

    update(id: string, updatedProduct: Partial<Product>): void {
        const index = this.products.findIndex((product) => product.id === id);
    
        if (index === -1) {
            throw new Error(`Produto com o id '${id}' não encontrado!`);
        }
    
        const currentProduct = this.products[index];
    
        if (updatedProduct.promotion === false && currentProduct.promotionActive) {
            currentProduct.price = currentProduct.factoryValue!;
    
            const promotion = currentProduct.promotionActive;
            if (promotion) {
                const promotionRemoved = promotion.deletePromotion(this.promotions);
                if (promotionRemoved) {
                    currentProduct.promotionActive = undefined;
                }
            }
        }
        if (updatedProduct.promotionActive) {
            if (currentProduct.promotionActive) {
                console.log(`Produto já possui uma promoção ativa. Não é possível aplicar outra.`);
                return;
            }
    
            currentProduct.promotionActive = updatedProduct.promotionActive;
            currentProduct.price = currentProduct.price - (currentProduct.price * (updatedProduct.promotionActive.discountPercentage / 100));
            console.log(`Promoção de ${updatedProduct.promotionActive.discountPercentage}% aplicada ao produto ${currentProduct.name}`);
        }
        this.products[index] = { ...currentProduct, ...updatedProduct };
        console.log(`Produto com o id '${id}' foi atualizado com sucesso!`);
    }
}
