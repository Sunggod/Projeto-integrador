import { IsArray, IsEnum, IsNumber, IsOptional, IsUUID, ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Product } from "../../Product/model/product";
import { CartStatus } from "../enums/order-status-enum";
import { Store } from "../../Store/model";
import { UserCommum } from "../../CommonUser/models";
import { Order } from "../../Orders/models";

export class CartDTO {
    @IsNumber()
    totalPrice!: number;

    @IsUUID()
    userCart!: UserCommum["id"];

    @IsUUID()
    storeId!: Store["id"];

    @IsEnum(CartStatus)
    status!: CartStatus;

    @IsOptional()
    @ValidateNested()
    @Type(() => Order) 
    order?: Order;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Product)
    products?: Product[];
}
