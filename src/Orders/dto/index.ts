import { Type } from "class-transformer";
import { Product } from "../../Product/model/product";
import { OrderStatus } from "../enums/order-status-enum";
import { IsArray, IsDate, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { User } from "../../User/model";
import { ErrorMessages } from "../constant";
import { UserCommum } from "../../CommonUser/models";


export class OrderDto{
    @IsNotEmpty()
    @ValidateNested({ each: true})
    userId!: UserCommum["id"];
    @IsArray({
        message: ErrorMessages.ORDER_PRODUCTS
    })
    @ValidateNested({ each: true})
    @Type(() => Product)
    @IsNotEmpty({
        message:ErrorMessages.ORDER_PRODUCTS_REQUIRED
    })
    products!: Product[];
    @IsNumber({},{
        message:ErrorMessages.ORDER_TOTAL_PRICE
    })
    @IsNotEmpty({
        message:ErrorMessages.ORDER_TOTAL_PRICE_REQUIRED
    })
    totalPrice!: number;
    @IsDate()
    @IsOptional()
    startDate?: Date;
    @IsDate()
    @IsOptional()
    deliveryDate?: Date;
    @IsDate()
    @IsOptional()
    DataProcessing?: Date;
    @IsEnum({
        message:ErrorMessages.ORDER_STATUS_ENUM
    })
    @IsNotEmpty({
        message:ErrorMessages.ORDER_STATUS_REQUIRED
    })
    status!: OrderStatus; 
}