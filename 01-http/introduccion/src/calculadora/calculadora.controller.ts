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
        @Req() req,
        @Res() res
    ) {
        const arrayCookies: object = req.cookies;
        if (req.cookies['nombreUsuario']) {
            const num1: number = Number(parametrosDeConsulta.numero1);
            const num2: number = Number(parametrosDeConsulta.numero2);
            if (isNaN(num1) || isNaN(num2)) {
                throw new BadRequestException('Error validando');
            } else {
                console.log('Parametros de consulta', parametrosDeConsulta);
                const valor: number = (num1 + num2)
                const puntaje: number = Number(req.signedCookies['puntaje']) - Math.abs(valor);
                this.validacionPuntaje(req, res, puntaje, valor);
            }
        } else {
            throw new BadRequestException('Sin Usuario, por favor regístrese');
        }
    }

    @Put('restar')
    @HttpCode(201)
    async restar(
        @Body() parametrosDeCuerpo,
        @Req() req,
        @Res() res
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
                    const valor: number = (resta.numero1 - resta.numero2)
                    const puntaje: number = Number(req.signedCookies['puntaje']) - Math.abs(valor);
                    this.validacionPuntaje(req, res, puntaje, valor);
                }
            } catch (e) {
                console.log(e);
                throw new BadRequestException('Error validando');
            }
        } else {
            throw new BadRequestException('Sin Usuario, por favor regístrese');
        }
    }

    @Delete('multiplicar')
    @HttpCode(200)
    multiplicar(
        @Headers() headers,
        @Req() req,
        @Res() res
    ) {
        const arrayCookies: object = req.cookies;
        if (arrayCookies['nombreUsuario']) {
            const num1: number = Number(headers.numero1);
            const num2: number = Number(headers.numero2);
            if (isNaN(num1) || isNaN(num2)) {
                throw new BadRequestException('Error validando');
            } else {
                console.log('Headers', headers);
                const valor: number = (num1 * num2)
                const puntaje: number = Number(req.signedCookies['puntaje']) - Math.abs(valor);
                this.validacionPuntaje(req, res, puntaje, valor);
            }
        } else {
            throw new BadRequestException('Sin Usuario, por favor regístrese');
        }
    }

    @Post('dividir/:dividendo/:divisor')
    @HttpCode(201)
    dividir(
        @Param() parametrosDeRuta,
        @Req() req,
        @Res() res
    ) {
        const arrayCookies: object = req.cookies;
        if (arrayCookies['nombreUsuario']) {
            const dividendo: number = Number(parametrosDeRuta.dividendo);
            const divisor: number = Number(parametrosDeRuta.divisor);
            if (isNaN(dividendo) || isNaN(divisor) || divisor === 0) {
                throw new BadRequestException('Error validando')
            } else {
                console.log('Parametros de ruta', parametrosDeRuta);
                const valor: number = (parametrosDeRuta.dividendo / parametrosDeRuta.divisor)
                const puntaje: number = Number(req.signedCookies['puntaje']) - Math.abs(valor);
                this.validacionPuntaje(req, res, puntaje, valor);
            }
        } else {
            throw new BadRequestException('Sin Usuario, por favor regístrese');
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
        res.cookie('puntaje', 100, {signed: true});
        res.send({
            mensaje: 'Usuario guardado',
            usuario: parametrosDeConsulta.usuario
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

    validacionPuntaje(req, res, puntaje, valor) {
        const mensajeInformativo: string = req.cookies['nombreUsuario'] + ', terminaste tus puntos. Se te han restablecido a 100 nuevamente'
        let mensaje = {
            respuesta: valor
        }
        if (puntaje < 1) {
            mensaje['Informacion'] = mensajeInformativo
            res.cookie('puntaje', 100, {signed: true});
        } else {
            res.cookie('puntaje', puntaje, {signed: true});
        }
        res.send(mensaje);
    }

}