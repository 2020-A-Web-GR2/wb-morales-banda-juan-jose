import {IsInt, IsNotEmpty} from "class-validator";

export class restaDTO {
    @IsInt()
    @IsNotEmpty()
    numero1: number;

    @IsInt()
    @IsNotEmpty()
    numero2: number;
}

