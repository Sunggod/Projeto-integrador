import { BaseEntry } from "../../base";
import { Promotion } from "../../Promotion/model";

type status = 'ativo' | 'desativado';

export class Product extends BaseEntry {  // Certifique-se de que Product estende BaseEntry
    name: string;
    price:number;
    mark: string;
    status: status;
    expiryDate: Date;
    urlImage: string;
    promotion?: boolean;
    promotionActive?: Promotion[];

    // Agora o construtor da Product chama o construtor de BaseEntry
    constructor(
        name: string, 
        price:number,

        mark: string, 
        status: status, 
        expiryDate: Date, 
        urlImage: string, 
        promotion?: boolean, 
        promotionActive?: Promotion[], 
        id?: string,  
        createdAt?: Date, 
        updatedAt?: Date  
    ) {
        super(id, createdAt, updatedAt);

        this.name = name;
        this.price = price
        this.mark = mark;
        this.status = status;
        this.expiryDate = expiryDate;
        this.urlImage = urlImage;
        this.promotion = promotion;
        this.promotionActive = promotionActive;
    }

    validate(): boolean {
        if (this.status == 'desativado') {
            console.log('Produto desativado');
            return false;
        } else {
            console.log('Produto Ativado');
            return true;
        }
    }
}
