import { Product } from "../model/product";

export interface IProductService {
    create(product: Product): void;
    update(product: Product): void;
    findById(id: bigint): Product | null;
    delete(id: bigint): void;
}