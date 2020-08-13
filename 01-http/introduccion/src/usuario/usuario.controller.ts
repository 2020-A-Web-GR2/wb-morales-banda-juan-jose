import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

@Controller('usuario')
export class UsuarioController {

    /* Para utilizar el estandar RESTfull se utiliza lo siguiente:
    Usualmente se utilizará una base de datos.
    RESTful tiene:
    - ver todos
    - ver uno
    - crear uno
    - editar uno
    - eliminar uno
    */
    public arregloUsuarios = [
        {
            id: 1,
            nombre: "Adrian",
        },
        {
            id: 2,
            nombre: "Juan",
        },
        {
            id: 3,
            nombre: "Jose",
        }
    ]
    public idActual = 3;

    constructor(
        private readonly _usuarioService: UsuarioService
    ) {

    }

    @Get()
    async mostrarTodos() {
        try {
            const respuesta = await this._usuarioService.buscarTodos();
            return respuesta;
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error validando datos'
            })
        }
        //return this.arregloUsuarios;
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ) {
        // VALIDACIONES CON EL CREATE DTO
        try {
            const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
            return respuesta;
        } catch (e) {
            console.log(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
        // const nuevoUsuario = {
        //     id: this.idActual + 1,
        //     nombre: parametrosCuerpo.nombre
        // }
        // this.arregloUsuarios.push(nuevoUsuario);
        // this.idActual = this.idActual + 1;
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ) {
        let respuesta;
        try {
            respuesta = await this._usuarioService.buscarUno(Number(parametrosRuta.id));
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error validando datos'
            });
        }
        if (respuesta) {
            return respuesta;
        } else {
            throw new NotFoundException({
                mensaje: "No existen registros"
            });
        }
        // const indice = this.arregloUsuarios.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // return this.arregloUsuarios[indice];
    }

    @Put(':id')
    editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ) {
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        );
        this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuarios[indice];
    }

    @Delete(':id')
    eliminarUno(
        @Param() parametrosRuta
    ) {
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        );
        this.arregloUsuarios.splice(indice, 1);
        return this.arregloUsuarios[indice];
    }


}