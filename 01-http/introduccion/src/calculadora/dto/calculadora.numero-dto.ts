import {IsInt, IsNegative, IsNotEmpty, IsNumber, IsPositive} from "class-validator";

export class CalculadoraDTO {

    @IsInt()
    @IsPositive()
    @IsNegative()
    @IsNotEmpty()
    dividendo: number;

    @IsPositive()
    @IsNegative()
    @IsNotEmpty()
    divisor: number;
}

export class restaDTO {
    @IsInt()
    @IsNotEmpty()
    numero1: number

    @IsInt()
    @IsNotEmpty()
    numero2: number
}

