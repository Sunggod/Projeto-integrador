import { Store } from "../../Store/model";
import { User } from "../../User/model";
import { CreateProductDto } from "../dtos/create-product-dto";
import { Product } from "../model/product";

export  interface IProductService {
    create(productDto: CreateProductDto, storeId:Store["id"],userId:User["id"]): void;
    update(id: string ,storeId:Store["id"],userId:User["id"], updatedProduct: Partial<Product>): void;
    findById(id: string): Product | null;
    delete(id: string,storeId:Store["id"],userId:User["id"]): void;
}
