import { IsString, IsNotEmpty, IsArray, IsOptional, IsUrl, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Employees } from '../../Employees/model';
import { Product } from '../../Product/model/product';
import { ErrorMessages } from '../constants/error-message';
import { Adress } from './../interface/adress.interface';
import { AdressClass } from './model/adress-class-suport';

export class StoreDTO {
    @IsString({ message: ErrorMessages.STORE_NAME_STRING })
    @IsNotEmpty({ message: ErrorMessages.STORE_NAME_REQUIRED })
    name!: string;

    @IsArray({ message: ErrorMessages.STORE_ADDRESS_ARRAY })
    @ValidateNested({ each: true, message: ErrorMessages.STORE_ADDRESS_VALID_OBJECT })
    @Type(() => AdressClass)
    adress!: Adress[];

    @IsString({ message: ErrorMessages.STORE_OWNER_STRING })
    @IsNotEmpty({ message: ErrorMessages.STORE_OWNER_REQUIRED })
    owner!: string;

    @IsDate({ message: ErrorMessages.STORE_OPENING_HOURS_DATE })
    @Type(() => Date)
    openingHours!: Date;

    @IsDate({ message: ErrorMessages.STORE_CLOSING_TIME_DATE })
    @Type(() => Date)
    closingTime!: Date;

    @IsOptional()
    @IsUrl({}, { message: ErrorMessages.STORE_IMAGE_BANNER_URL })
    imageBannerUrl?: string;

    @IsOptional()
    @IsUrl({}, { message: ErrorMessages.STORE_IMAGE_LOGO_URL })
    imageLogoUrl?: string;

    @IsOptional()
    @IsArray({ message: ErrorMessages.STORE_EMPLOYEES_ARRAY })
    @ValidateNested({ each: true, message: ErrorMessages.STORE_EMPLOYEES_VALID_OBJECT })
    @Type(() => Employees)
    employees?: Employees[];

    @IsOptional()
    @IsArray({ message: ErrorMessages.STORE_PRODUCTS_ARRAY })
    @ValidateNested({ each: true, message: ErrorMessages.STORE_PRODUCTS_VALID_OBJECT })
    @Type(() => Product)
    products?: Product[];
}
