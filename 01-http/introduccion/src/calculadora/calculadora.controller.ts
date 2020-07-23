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
    Param, Req, Res
} from "@nestjs/common";
import {restaDTO} from "./dto/calculadora.numero-dto";
import {validate, ValidationError} from "class-validator";

@Controller('calculadora')

export class CalculadoraController {

    @Get('sumar')
    @HttpCode(200)
    sumar(
        @Query() parametrosDeConsulta,
        @Req() req
    ) {
        const arrayCookies: object = req.cookies;
        if (arrayCookies['nombreUsuario']) {
            const num1: number = parseFloat(parametrosDeConsulta.numero1);
            const num2: number = parseFloat(parametrosDeConsulta.numero2);
            if (isNaN(num1) || isNaN(num2)) {
                throw new BadRequestException('Error validando');
            } else {
                console.log('Parametros de consulta', parametrosDeConsulta);
                return num1 + num2;
            }
        } else {
            throw new BadRequestException('Sin Usuario');
        }


    }

    @Put('restar')
    @HttpCode(201)
    async restar(
        @Body() parametrosDeCuerpo,
        @Req() req
    ) {
        const arrayCookies: object = req.cookies;
        if (arrayCookies['nombreUsuario']) {
            const resta = new restaDTO();
            resta.numero1 = parametrosDeCuerpo.numero1;
            resta.numero2 = parametrosDeCuerpo.numero2;
            try {
                const errores: ValidationError[] = await validate(resta);
                if (errores.length > 0) {
                    console.log('Error', errores);
                    throw new BadRequestException('Error validando');
                } else {
                    console.log('Parametros de cuerpo', parametrosDeCuerpo);
                    return resta.numero1 - resta.numero2;
                }
            } catch (e) {
                console.log(e);
                throw new BadRequestException('Error validando');
            }
        } else {
            throw new BadRequestException('Sin Usuario');
        }
    }

    @Delete('multiplicar')
    @HttpCode(200)
    multiplicar(
        @Headers() headers,
        @Req() req
    ) {
        const arrayCookies: object = req.cookies;
        if (arrayCookies['nombreUsuario']) {
            const num1: number = parseFloat(headers.numero1);
            const num2: number = parseFloat(headers.numero2);
            if (isNaN(num1) || isNaN(num2)) {
                throw new BadRequestException('Error validando');
            } else {
                console.log('Headers', headers);
                return num1 * num2;
            }
        } else {
            throw new BadRequestException('Sin Usuario');
        }
    }

    @Post('dividir/:dividendo/:divisor')
    @HttpCode(201)
    dividir(
        @Param() parametrosDeRuta,
        @Req() req
    ) {
        const arrayCookies: object = req.cookies;
        if (arrayCookies['nombreUsuario']) {
            const dividendo: number = parseFloat(parametrosDeRuta.dividendo);
            const divisor: number = parseFloat(parametrosDeRuta.divisor);
            if (isNaN(dividendo) || isNaN(divisor) || divisor === 0) {
                throw new BadRequestException('Error validando')
            } else {
                console.log('Parametros de ruta', parametrosDeRuta);
                return parametrosDeRuta.dividendo / parametrosDeRuta.divisor;
            }
        } else {
            throw new BadRequestException('Sin Usuario');
        }

    }

    @Get('guardar-usuario')
    @HttpCode(201)
    guardarUsuario(
        @Query() parametrosDeConsulta,
        @Req() req,
        @Res() res
    ) {
        res.cookie('nombreUsuario', parametrosDeConsulta.usuario);
        res.send({
            mensaje: 'Usuario guardado'
        });
        console.log('cookie creada', req.cookies['nombreUsuario']);
    }

    @Get('mostrarCookies')
    mostrarCookies(
        @Req() req
    ) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        };
        return mensaje;
    }
}