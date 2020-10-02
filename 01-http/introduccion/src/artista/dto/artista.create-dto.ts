import {IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength} from "class-validator";

export class ArtistaCreateDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    pathImagen: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    pais: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    anioDebut: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    genero: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    cancion: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(40)
    discografia: string;
}