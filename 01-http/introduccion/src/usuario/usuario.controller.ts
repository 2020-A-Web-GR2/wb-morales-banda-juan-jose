import {Body, Controller, Get, Param, Post} from "@nestjs/common";

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

    @Get()
    mostrarTodos() {
        return this.arregloUsuarios;
    }

    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ) {
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.nombre
        }
        this.arregloUsuarios.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
    }

    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ) {
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuarios[indice];
    }

}