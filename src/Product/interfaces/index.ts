import { CreateProductDto } from "../dtos/product.dto";
import { Product } from "../model/product";

export  interface IProductService {
    create(productDto: CreateProductDto): void;
    update(id: string, updatedProduct: Partial<Product>): void;
    findById(id: string): Product | null;
    delete(id: string): void;
}
