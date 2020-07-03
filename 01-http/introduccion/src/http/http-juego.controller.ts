import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post} from "@nestjs/common";

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

}