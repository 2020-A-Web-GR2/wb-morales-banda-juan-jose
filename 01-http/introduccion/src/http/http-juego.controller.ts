import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Req, Res,
    Headers
} from "@nestjs/common";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";

/// http://localhost:3001/juegos-http
// /juegos-http
@Controller('juegos-http')

export class HttpJuegoController {

    @Get('hola')
    @HttpCode(201)
    holaGet() {
        throw new BadRequestException('No envía nada') // 400
        //return 'Hola GET! :v';
    }

    @Post('hola')
    @HttpCode(202)
    holaPost() {
        return 'Hola POST! :V';
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    @Header('EPN', 'probando las cosas')
    holaDelete() {
        return 'Hola  DELETE! :v';
    }

    // http://localhost:3001/juegos-http/parametros-ruta/XX/gestion/YY
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ) {
        console.log('Parámetros', parametrosRuta);
        // Validar que es un número:
        if (isNaN(parametrosRuta.edad) || isNaN(parametrosRuta.altura)) {
            throw new BadRequestException('Almenos un parámetro no es un número') // 400
        } else {
            const edad = Number(parametrosRuta.edad);
            const altura = Number(parametrosRuta.altura)
            return edad + altura;
        }

    }

    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ) {
        console.log('parametrosDeConsulta', parametrosDeConsulta);
        // Recomendacion: usar una variable para saber si tiene nombre y apellido
        // y usar esa en el if.
        if (parametrosDeConsulta.nombre && parametrosDeConsulta.apellido) {
            return parametrosDeConsulta.nombre + ' ' + parametrosDeConsulta.apellido;
        } else {
            return ':D';
        }
    }

    @HttpCode(200)
    @Post('parametros-cuerpo')
    async parametrosDeCuerpo(
        @Body() parametrosDeCuerpo
    ) {
        // Promesas
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.casada = parametrosDeCuerpo.casada;
        mascotaValida.ligada = parametrosDeCuerpo.ligada;
        mascotaValida.peso = parametrosDeCuerpo.peso;
        try {
            const errores: ValidationError[] = await validate(mascotaValida);
            if (errores.length > 0) {
                console.log('Error', errores)
                throw new BadRequestException('Error validando')
            } else {
                const mensajeCorrecto = {
                    mensaje: 'Se creo correctamente'
                };
                console.log('Parametros de cuerpo', parametrosDeCuerpo)
                return mensajeCorrecto;
            }
        } catch (error) {
            console.log('Error', error);
            throw new BadRequestException('Error validando');
        }
    }

    // 1 Guardar Cookie Insegura
    // 2 Guardar Cookie Segura
    // 3 Mostrar Cookies
    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req,  // request - peticicon
        @Res() res  // response - respuesta
    ) {
        res.cookie(
            'galletaInsegura', // nombre
            'Tengo hambree', // valor
        );
        res.send({ // metodo EXPRESSJS
            mensaje: 'ok'
        });
        // NO SE PUEDE USAR RETURN CUANDO SE USA @RES
    }

    @Get('guardarCookieSegura')
    guardarCookieSegura(
        @Query() parametrosConsulta,
        @Req() req,  // request - peticicon
        @Res() res  // response - respuesta
    ) {
        res.cookie(
            'galletaSegura', // nombre
            'Web :3', // valor
            {
                secure: true
            }
        );
        res.send({ // metodo EXPRESSJS
            mensaje: 'ok'
        });
        // NO SE PUEDE USAR RETURN CUANDO SE USA @RES
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

    @Get('guardarCookieFirmada')
    guardarCookieFirmada(
        @Res() res
        //@Headers() headers // peticion - request
    ) {
        // res.header('Cabecera', 'Dinamica') // respuesta
        // nombre, llave,
        res.cookie('firmada', 'hornado', {signed: true});
        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje);
    }


}