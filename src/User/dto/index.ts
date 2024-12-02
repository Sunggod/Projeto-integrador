import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator"
import { Store } from "../../Store/model"
import { ErrorMessages } from "../constants/error-message"
import { Type } from "class-transformer"

export class UserDto{
    @IsString({
        message:ErrorMessages.USER_NAME_STRING
    })
    @IsNotEmpty({
        message:ErrorMessages.USER_NAME_REQUIRED
    })
    name!:string
    @IsString({
        message:ErrorMessages.USER_EMAIL_STRING
    })
    @IsNotEmpty({
        message:ErrorMessages.USER_EMAIL_REQUIRED
    })
    email!:string
    @IsNumber({},{
        message:ErrorMessages.USER_AGE_NUMBER
    })
    @IsNotEmpty({
        message:ErrorMessages.USER_AGE_REQUIRED
    })
    age!:number
    @IsString({
        message:ErrorMessages.USER_PASSWORD_STRING
    })
    @IsNotEmpty({
        message:ErrorMessages.USER_PASSWORD_REQUIRED
    })
    password!:string

    @IsString({
        message:ErrorMessages.USER_AVATARURL_STRING
    })
    @IsUrl({},{
        message:ErrorMessages.USER_AVATARURL_INVALID
    })
    @IsOptional()
    avatarUrl!:string

    @IsOptional()
    @IsArray({ message: ErrorMessages.USER_STORES_ARRAY })
    @ValidateNested({ each: true, message: ErrorMessages.USER_STORES_VALID_OBJECT })
    @Type(() => Store)
    stores?:Store[]

}