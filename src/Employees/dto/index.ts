import { IsNotEmpty, IsNumber, IsOptional, IsPostalCode, IsSemVer, IsString, IsUrl } from "class-validator"
import { Store } from "../../Store/model"
import { User } from "../../User/model"
import {  Role } from "../types"
import { ErrorMessages } from "../constant"

export class EmployeeDto{
    @IsString({
        message:ErrorMessages.EMPLOYEE_NAME_STRING
    })
    @IsNotEmpty({
        message: ErrorMessages.EMPLOYEE_NAME_REQUIRED
    })
    name!:string
    @IsNotEmpty({
        message: ErrorMessages.EMPLOYEE_AGE_REQUIRED
    })
    @IsNumber({},{
        message: ErrorMessages.EMPLOYEE_AGE_NUMBER
    })
    age!:number

    @IsString({
        message:ErrorMessages.EMPLOYEE_EMAIL_STRING
    })
    @IsNotEmpty({
        message: ErrorMessages.EMPLOYEE_EMAIL_REQUIRED
    })
    email!:string

    @IsString({
        message:ErrorMessages.EMPLOYEE_PASSWORD_STRING
    })

    @IsNotEmpty({
        message: ErrorMessages.EMPLOYEE_PASSWORD_REQUIRED
    })
    password!:string

    @IsString({
        message:ErrorMessages.EMPLOYEE_BOSS_STRING
    })
    @IsNotEmpty({
        message: ErrorMessages.EMPLOYEE_BOSS_REQUIRED
    })
    bossId!:User["id"]

    @IsString({
        message:ErrorMessages.EMPLOYEE_STORE_STRING
    })
    @IsNotEmpty({
        message: ErrorMessages.EMPLOYEE_STORE_REQUIRED
    })
    storeId!:Store["id"]

    role!:Role

    @IsOptional()
    @IsString({
        message: ErrorMessages.EMPLOYEE_IMAGE_URL_STRING
    })
    @IsUrl()
    imageUrl?:string

    @IsOptional()
    @IsString({
        message: ErrorMessages.EMPLOYEE_CPF_STRING
    })
    cpf?:string

}