import { Banner } from "../../Promotion/interfaces";
import { Promotion, PromotionType } from "../../Promotion/model";
import {
    IsNotEmptyString,
    IsStringValidation,
    IsNotEmptyNumber,
    IsNumberValidation,
    IsNotEmptyDate,
    IsDateValidation,
    IsOptionalString,
    IsOptionalNumber,
    IsOptionalBoolean,
    IsOptionalArray,
    IsOptionalDate,
    IsBooleanValidation,
    MinDiscountPercentage,
    MaxDiscountPercentage,
    MinPrice,
    MaxPrice,
  } from "../constants/CreateProductDtoDecorators"; 
  
  export class CreateProductDto {
    @IsNotEmptyString
    @IsStringValidation
    name!: string;
  
    @IsNotEmptyNumber
    @IsNumberValidation
    @MinPrice
    @MaxPrice
    price!: number;
  
    @IsNotEmptyNumber
    @IsNumberValidation
    stock!: number;
  
    @IsNotEmptyString
    @IsStringValidation
    mark!: string;
  
    @IsNotEmptyString
    @IsStringValidation
    storeId!: string;
  
    @IsNotEmptyDate
    @IsDateValidation
    expiryDate!: Date;
  
    @IsNotEmptyString
    @IsStringValidation
    urlImage!: string;
  
    @IsOptionalNumber
    @IsNumberValidation
    factoryValue?: number;
  
    @IsOptionalBoolean
    @IsBooleanValidation
    promotion?: boolean;
  
    @IsOptionalString
    @IsStringValidation
    promotionTitle?: string;
  
    @IsOptionalString
    @IsStringValidation
    promotionDescription?: string;
  
    @IsOptionalArray
    promotionBanners?: Banner[];
  
    @IsOptionalString
    @IsStringValidation
    promotionType?: PromotionType;
  
    @IsOptionalNumber
    @MinDiscountPercentage
    @MaxDiscountPercentage
    discountPercentage?: number;
  
    @IsOptionalString
    @IsStringValidation
    @IsNotEmptyString
    promotionActive?: Promotion;
  }
  
