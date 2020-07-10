import {
    IsAlpha,
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

export class MascotaCreateDto {
    @IsAlpha()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    nombre: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    edad: number;  // enteros

    @IsBoolean()
    @IsNotEmpty()
    casada: boolean;

    @IsOptional()
    @IsBoolean()
    ligada?: boolean;  // con ? significa que puede ser opcional

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    peso: number;  // decimales
}



