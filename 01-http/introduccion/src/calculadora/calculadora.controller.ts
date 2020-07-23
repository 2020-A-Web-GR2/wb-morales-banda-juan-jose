import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Put,
    Query,
    Headers,
    Post,
    Param
} from "@nestjs/common";
import {CalculadoraDTO, restaDTO} from "./dto/calculadora.numero-dto";
import {validate, ValidationError} from "class-validator";

@Controller('calculadora')

export class CalculadoraController {

    @Get('sumar')
    @HttpCode(200)
    sumar(
        @Query() parametrosDeConsulta
    ) {
        const num1: number = parseFloat(parametrosDeConsulta.numero1)
        const num2: number = parseFloat(parametrosDeConsulta.numero2)
        if (isNaN(num1) || isNaN(num2)) {
            throw new BadRequestException('Error validando');
        } else {
            return num1 + num2;
        }
    }

    @Put('restar')
    @HttpCode(201)
    async restar(
        @Body() parametrosDeCuerpo
    ) {
        const resta = new restaDTO();
        resta.numero1 = parametrosDeCuerpo.numero1;
        resta.numero2 = parametrosDeCuerpo.numero2;
        try {
            const errores: ValidationError[] = await validate(resta);
            if (errores.length > 0) {
                console.log('Error', errores)
                throw new BadRequestException('Error validando');
            } else {
                console.log('Parametros de cuerpo', parametrosDeCuerpo);
                return resta.numero1 - resta.numero2;
            }
        } catch (e) {
            console.log(e);
            throw new BadRequestException('Error validando');
        }
    }

    @Delete('multiplicar')
    @HttpCode(200)
    multiplicar(
        @Headers() headers
    ) {
        const num1: number = parseFloat(headers.numero1);
        const num2: number = parseFloat(headers.numero2);
        if (isNaN(num1) || isNaN(num2)) {
            throw new BadRequestException('Error validando');
        } else {
            return num1 * num2;
        }
    }

    @Post('dividir/:dividendo/:divisor')
    @HttpCode(201)
    dividir(
        @Param() parametrosDeRuta
    ) {
        const dividendo: number = parseFloat(parametrosDeRuta.dividendo)
        const divisor: number = parseFloat(parametrosDeRuta.divisor)
        if (isNaN(dividendo) || isNaN(divisor) || divisor === 0) {
            throw new BadRequestException('Error validando')
        } else {
            return parametrosDeRuta.dividendo / parametrosDeRuta.divisor;
        }
    }
}