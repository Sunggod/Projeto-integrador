import { FileRepository } from "../../database/FileRepository";
import { Promotion } from "../../Promotion/model";
import { Store } from "../../Store/model";
import { User } from "../../User/model";
import { CreateProductDto } from "../dtos/create-product-dto";
import { IProductService } from "../interfaces";    
import { Product } from "../model/product";

export  class ProductService implements IProductService {
    private fileRepo!: FileRepository;
    constructor(){}
    private async init():Promise <void>{
         this.fileRepo = await FileRepository.getInstance()
    }
    public  verifyOwnership(storeId: Store["id"], userId: User["id"]): void {
        const store = this.fileRepo.getStores().find((store) => store.id === storeId);
        if (!store) {
            throw new Error(`Loja com o id '${storeId}' não encontrada!`);
        }
        if (store.owner !== userId) {
            throw new Error(`Usuário '${userId}' não é o proprietário da loja '${storeId}'!`);
        }
    }

    async create(productDto: CreateProductDto, storeId: Store["id"], userId: User["id"]): Promise<void> {
        this.verifyOwnership(storeId, userId);

        const product = new Product(
            productDto.name,
            productDto.price,
            productDto.stock,
            productDto.mark,
            (productDto.storeId = storeId),
            "ativo",
            productDto.expiryDate,
            productDto.urlImage,
            productDto.factoryValue!,
            productDto.promotion,
            undefined
        );

        if (productDto.promotion && !product.promotionActive) {
            const promotion = new Promotion(
                productDto.promotionTitle!,
                productDto.promotionDescription!,
                productDto.promotionBanners!,
                productDto.promotionType!,
                productDto.discountPercentage!,
                product.id
            );

            this.fileRepo.getPromotions().push(promotion);
            product.promotionActive = promotion;

            product.price = product.price - product.price * (promotion.discountPercentage / 100);
            console.log(`Desconto de ${promotion.discountPercentage}% aplicado ao produto ${product.name}`);
        }

        await this.fileRepo.addProduct(product);
        console.log(`Produto ${product.name} criado com sucesso!`);
    }

     findById(id: string): Product | null {
        return  this.fileRepo.getProducts().find((product) => product.id === id) || null;
    }

    async delete(id: string, storeId: Store["id"], userId: User["id"]): Promise<void> {
        this.verifyOwnership(storeId, userId);

        const productIndex = this.fileRepo.getProducts().findIndex(
            (product) => product.id === id && product.storeId === storeId
        );

        if (productIndex === -1) {
            throw new Error(`Produto com o id '${id}' não encontrado na loja '${storeId}'!`);
        }

        await this.fileRepo.getProducts().splice(productIndex, 1);
        await this.fileRepo.saveChanges();  

        console.log(`Produto com o id '${id}' foi deletado com sucesso!`);
    }

    async update(
        id: string,
        storeId: Store["id"],
        userId: User["id"],
        updatedProduct: Partial<Product>
    ): Promise<void> {
        this.verifyOwnership(storeId, userId);

        const index = this.fileRepo.getProducts().findIndex(
            (product) => product.id === id && product.storeId === storeId
        );

        if (index === -1) {
            throw new Error(`Produto com o id '${id}' não encontrado na loja '${storeId}'!`);
        }

        const currentProduct = await this.fileRepo.getProducts()[index];

        if (updatedProduct.promotion === false && currentProduct.promotionActive) {
            currentProduct.price = currentProduct.factoryValue!;

            const promotion = currentProduct.promotionActive;
            if (promotion) {
                const promotionRemoved = promotion.deletePromotion(await this.fileRepo.getPromotions());
                if (promotionRemoved) {
                    currentProduct.promotionActive = undefined;
                }
            }
        }

        if (updatedProduct.promotionActive) {
            if (currentProduct.promotionActive) {
                console.log(
                    `Produto já possui uma promoção ativa. Não é possível aplicar outra.`
                );
                return;
            }

            currentProduct.promotionActive = updatedProduct.promotionActive;
            currentProduct.price =
                currentProduct.price -
                currentProduct.price * (updatedProduct.promotionActive.discountPercentage / 100);
            console.log(
                `Promoção de ${updatedProduct.promotionActive.discountPercentage}% aplicada ao produto ${currentProduct.name}`
            );
        }

        this.fileRepo. getProducts()[index] = { ...currentProduct, ...updatedProduct };
        await this.fileRepo.saveChanges();  
        console.log(`Produto com o id '${id}' foi atualizado com sucesso!`);
    }
}
