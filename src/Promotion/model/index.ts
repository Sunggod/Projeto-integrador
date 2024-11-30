import { BaseEntry } from "../../base";
import { Product } from "../../Product/model/product";
import { Banner } from "../interfaces";
export type PromotionType = "product" | "plan" | "orders";
export class Promotion extends BaseEntry {
  tittle: string;
  description: string;
  bannersUrl: Banner[];
  promotionType: PromotionType;
  discountPercentage: number;
  productId?: Product["id"];

  constructor(
    tittle: string,
    description: string,
    bannersUrl: Banner[],
    promotionType: PromotionType,
    discountPercentage: number,
    productId?: Product["id"],
    createdAt?: Date,
    updateAt?: Date,
    id?: string
  ) {
    super(id, createdAt, updateAt);
    this.tittle = tittle;
    this.description = description;
    this.bannersUrl = bannersUrl;
    this.promotionType = promotionType;
    this.discountPercentage = discountPercentage;
    this.productId = productId;
  }

  deletePromotion(promotions: Promotion[]): boolean {
    const promotionIndex = promotions.findIndex(
      (promotion) => promotion.productId === this.productId
    );

    if (promotionIndex !== -1) {
      promotions.splice(promotionIndex, 1);
      console.log(`Promoção ${this.tittle} removida com sucesso!`);
      return true;
    } else {
      console.log("Promoção não encontrada para remoção!");
      return false;
    }
  }

  searchPromotionById(promotions:Promotion[], id:string):void{
    const promotionIndex = promotions.findIndex(
        (promotion) => promotion.id === id
        );
        if (promotionIndex !== -1) {
            console.log(`Promoção encontrada com sucesso!`);
            return;
        }
  }


  validate(): boolean {
    return true;
  }
}
