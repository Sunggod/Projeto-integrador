import { BaseEntry } from "../../base";
import { Promotion } from "../../Promotion/model";
import { validateSync } from 'class-validator';

type status = 'ativo' | 'desativado';

export class Product extends BaseEntry {  // Certifique-se de que Product estende BaseEntry
    name: string;
    price:number;
    stock:number;
    mark: string;
    storeId:string;
    status: status;
    expiryDate: Date;
    urlImage: string;
    factoryValue?:number;
    promotion?: boolean;
    promotionActive?: Promotion; 
    constructor(
        name: string, 
        price:number,
        stock:number,
        mark: string, 
        storeId:string,
        status: status, 
        expiryDate: Date, 
        urlImage: string, 
        factoryValue:number,
        promotion?: boolean, 
        promotionActive?: Promotion, 
        id?: string,  
        createdAt?: Date, 
        updatedAt?: Date  
    ) {
        super(id, createdAt, updatedAt);

        this.name = name;
        this.price = price
        this.stock = stock
        this.mark = mark;
        this.storeId = storeId;
        this.status = status;
        this.expiryDate = expiryDate;
        this.urlImage = urlImage;
        this.factoryValue = factoryValue;
        this.promotion = promotion;
        this.promotionActive = promotionActive;
    }

    validate?(): boolean {
        const errors = validateSync(this);
        if (errors.length > 0) {
            console.log('Erros de validação:', errors);
            return false;
        }
    
        if (this.status === 'desativado') {
            console.log('Produto desativado');
            return false;
        }
    
        console.log('Produto Ativado');
        return true;
    }
}
