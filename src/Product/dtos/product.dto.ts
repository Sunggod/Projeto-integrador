import {  IsBoolean, IsNotEmpty, IsNumber, isNumber, IsOptional, IsString } from "class-validator";

export class ProductDto{
    @IsNotEmpty({
        message:'O campo name não pode ser estar vazio!'
    })
    @IsString({
        message:'O campo name precisa ser uma string!'
    })
    name!:string 

    @IsNotEmpty({
        message:'O campo price não pode ser estar vazio!'
    })
    @IsNumber({},{
        message:'O campo price tem que ser um numero!'
    })
    price!:number

    @IsNotEmpty({
        message:'O campo mark não pode estar vazio!'
    })
    @IsString({
        message:'O campo mark precisa ser uma string!'
    })
    mark!:string

    @IsOptional()
    @IsBoolean({
        message:'O campo promotion precisa ser do tipo boolean!'
    })
    promotion!:boolean
    
}