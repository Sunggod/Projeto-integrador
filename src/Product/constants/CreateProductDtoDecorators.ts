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
  } from "class-validator";
  import { Promotion, PromotionType } from "../../Promotion/model";
  import { Banner } from "../../Promotion/interfaces";
  
  // Constantes de validação
  
  // Para campos obrigatórios e tipo string
  export const IsNotEmptyString = IsNotEmpty({ message: "O campo não pode estar vazio!" });
  export const IsStringValidation = IsString({ message: "O campo precisa ser uma string!" });
  
  // Para validação de número
  export const IsNotEmptyNumber = IsNotEmpty({ message: "O campo não pode estar vazio!" });
  export const IsNumberValidation = IsNumber({}, { message: "O campo precisa ser um número!" });
  
  // Para validação de data
  export const IsNotEmptyDate = IsNotEmpty({ message: "O campo não pode estar vazio!" });
  export const IsDateValidation = IsDate({ message: "O campo precisa ser uma data!" });
  
  // Para validação de booleano
  export const IsBooleanValidation = IsBoolean({ message: "O campo precisa ser do tipo boolean!" });
  
  // Para validação de array
  export const IsArrayValidation = IsArray({ message: "O campo precisa ser um array!" });
  
  // Para validação de valores opcionais
  export const IsOptionalString = IsOptional({ message: "Este campo é opcional" });
  export const IsOptionalNumber = IsOptional({ message: "Este campo é opcional" });
  export const IsOptionalBoolean = IsOptional({ message: "Este campo é opcional" });
  export const IsOptionalArray = IsOptional({ message: "Este campo é opcional" });
  export const IsOptionalDate = IsOptional({ message: "Este campo é opcional" });
  
  // Validação de limites para o campo de desconto
  export const MinDiscountPercentage = Min(0, { message: "O campo discountPercentage precisa ser maior ou igual a 0!" });
  export const MaxDiscountPercentage = Max(100, { message: "O campo discountPercentage precisa ser menor ou igual a 100!" });
  
  // Para validação de preços ou valores com um valor mínimo e máximo
  export const MinPrice = Min(0, { message: "O preço precisa ser maior ou igual a 0!" });
  export const MaxPrice = Max(1000000, { message: "O preço não pode ser maior que 1.000.000!" });
  