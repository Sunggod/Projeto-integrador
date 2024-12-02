import { Banner } from "../../Promotion/interfaces";
import { Promotion, PromotionType } from "../../Promotion/model";
import { ProductErrorMessages } from "../constants/error-message";
import {
    IsArray,
    IsDate,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    IsBoolean,
    Min,
    Max,
    IsUrl,
} from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ message: ProductErrorMessages.PRODUCT_NAME_REQUIRED })
    @IsString({ message: ProductErrorMessages.PRODUCT_NAME_STRING })
    name!: string;

    @IsNotEmpty({ message: ProductErrorMessages.PRODUCT_PRICE_REQUIRED })
    @IsNumber({}, { message: ProductErrorMessages.PRODUCT_PRICE_NUMBER })
    @Min(0, { message: ProductErrorMessages.PRODUCT_PRICE_MIN })
    @Max(1000000, { message: ProductErrorMessages.PRODUCT_PRICE_MAX })
    price!: number;

    @IsNotEmpty({ message: ProductErrorMessages.PRODUCT_STOCK_REQUIRED })
    @IsNumber({}, { message: ProductErrorMessages.PRODUCT_STOCK_NUMBER })
    stock!: number;

    @IsNotEmpty({ message: ProductErrorMessages.PRODUCT_MARK_REQUIRED })
    @IsString({ message: ProductErrorMessages.PRODUCT_MARK_STRING })
    mark!: string;

    @IsNotEmpty({ message: ProductErrorMessages.PRODUCT_STORE_ID_REQUIRED })
    @IsString({ message: ProductErrorMessages.PRODUCT_STORE_ID_STRING })
    storeId!: string;

    @IsNotEmpty({ message: ProductErrorMessages.PRODUCT_EXPIRY_DATE_REQUIRED })
    @IsDate({ message: ProductErrorMessages.PRODUCT_EXPIRY_DATE_DATE })
    expiryDate!: Date;

    @IsNotEmpty({ message: ProductErrorMessages.PRODUCT_URL_IMAGE_REQUIRED })
    @IsUrl({},{ message: ProductErrorMessages.PRODUCT_URL_IMAGE_STRING })
    urlImage!: string;

    @IsOptional()
    @IsNumber({}, { message: ProductErrorMessages.PRODUCT_FACTORY_VALUE_NUMBER })
    factoryValue?: number;

    @IsOptional()
    @IsBoolean({ message: ProductErrorMessages.PRODUCT_PROMOTION_BOOLEAN })
    promotion?: boolean;

    @IsOptional()
    @IsString({ message: ProductErrorMessages.PRODUCT_PROMOTION_TITLE_STRING })
    promotionTitle?: string;

    @IsOptional()
    @IsString({ message: ProductErrorMessages.PRODUCT_PROMOTION_DESCRIPTION_STRING })
    promotionDescription?: string;

    @IsOptional()
    @IsArray({ message: ProductErrorMessages.PRODUCT_PROMOTION_BANNERS_ARRAY })
    promotionBanners?: Banner[];

    @IsOptional()
    @IsString({ message: ProductErrorMessages.PRODUCT_PROMOTION_TYPE_STRING })
    promotionType?: PromotionType;

    @IsOptional()
    @Min(0, { message: ProductErrorMessages.PRODUCT_DISCOUNT_PERCENTAGE_MIN })
    @Max(100, { message: ProductErrorMessages.PRODUCT_DISCOUNT_PERCENTAGE_MAX })
    discountPercentage?: number;

    @IsOptional()
    @IsString({ message: ProductErrorMessages.PRODUCT_PROMOTION_ACTIVE_OBJECT })
    promotionActive?: Promotion;
}
