import { isArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { Adress } from "../../Store/interface/adress.interface"
import { ErrorMessages } from "../constants/error-message"
import { Cart } from "../../Cart/models"

export class UserCommumDto{
    @IsString({
        message: ErrorMessages.USER_NAME_STRING
    })
    @IsNotEmpty({
        message: ErrorMessages.USER_NAME_REQUIRED
    })
    name!:string

    @IsString({
        message: ErrorMessages.USER_EMAIL_STRING
    })
    @IsNotEmpty({
        message: ErrorMessages.USER_EMAIL_REQUIRED
    })
    email!:string

    @IsString({
        message: ErrorMessages.USER_PASSWORD_STRING
    })
    @IsNotEmpty({
        message: ErrorMessages.USER_PASSWORD_REQUIRED
    })
    password!:string

    @IsString({
        message: ErrorMessages.USER_STOREID_STRING
    })
    @IsNotEmpty({
        message: ErrorMessages.USER_STOREID_REQUIRED
    })
    storeId!:string
    @IsOptional()
    @IsNumber({},{
        message: ErrorMessages.USER_AGE_NUMBER
    })
    age?: number

    @IsOptional()
    cart!: Cart

    @IsOptional()
    adress?:Adress

    @IsString({
        message: ErrorMessages.USER_PICTURE_URL_STRING
    })
    @IsOptional()
    @IsUrl({},{
        message: ErrorMessages.USER_PICTURE_URL_INVALID
    })
    pictureImage?:string
}