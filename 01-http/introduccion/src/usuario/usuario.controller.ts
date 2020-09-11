import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query,
    Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {MascotaService} from "src/mascota/mascota.service";
import {UsuarioEntity} from "./usuario.entity";

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

    // Inyeccion de dependencias
    // usar _nombre cuando son servicios propios
    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _mascotaService: MascotaService,
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
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ) {
        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;
        let respuesta;
        try {
            respuesta = await this._usuarioService.editarUno(usuarioEditado);
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
        // );
        // this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        // return this.arregloUsuarios[indice];
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ) {
        const id = Number(parametrosRuta.id);
        let respuesta;
        try {
            respuesta = await this._usuarioService.eliminarUno(id);
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error validando datos'
            });
        }
        if (respuesta) {
            return {
                mensaje: "Registro con id " + id + " eliminado"
            };
        } else {
            throw new NotFoundException({
                mensaje: "No existen registros"
            });
        }
        // const indice = this.arregloUsuarios.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // );
        // this.arregloUsuarios.splice(indice, 1);
        // return this.arregloUsuarios[indice];
    }

    @Post('crearUsuarioYCrearMascota')
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ) {
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota;
        // Validar Usuario con DTO
        // Validar Mascota con DTO
        // CREAR AMBOS
        let usuarioCreado;
        try {
            usuarioCreado = await this._usuarioService.crearUno(usuario);
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException({
                mensaje: 'Error Creando Usuario'
            })
        }
        if (usuarioCreado) {
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada;
            try {
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota)
            } catch (e) {
                console.log(e)
                throw new InternalServerErrorException({
                    mensaje: 'Error Creando Mascota'
                })
            }
            if (mascotaCreada) {
                return {
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            } else {
                throw new InternalServerErrorException({
                    mensaje: 'Error Creando Mascota'
                })
            }
        } else {
            throw new InternalServerErrorException({
                mensaje: 'Error Creando Mascota'
            })
        }
    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        //VALIDAR CON DTO
        let nombreApellidoConsulta
        let cedulaConsulta
        if (parametrosCuerpo.cedula && parametrosCuerpo.nombre && parametrosCuerpo.apellido) {
            nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
            if (parametrosCuerpo.cedula.length === 10) {
                cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
            } else {
                const mensajeError = 'Cedula Incorrecta'
                return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta)
            }
        } else {
            const mensajeError = 'Enviar cedula (10) nombre y apellido'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError)
        }

        let respuestaCreacionUsuario
        try {
            respuestaCreacionUsuario = await this._usuarioService.crearUno(parametrosCuerpo)
        } catch (e) {
            console.log(e)
            const mensajeError = 'Error Creando Usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta)
        }
        if (respuestaCreacionUsuario) {
            console.log(respuestaCreacionUsuario)
            return res.redirect('/usuario/vista/inicio')
        } else {
            const mensajeError = 'Error Creando Usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta)
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._usuarioService.eliminarUno(id)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario eliminado')
        } catch (e) {
            console.log(e)
            return res.redirect('/usuario/vista/inicio?error=Error eliminando usuariro')
        }
    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        const usuarioEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido,
            //cedula: parametrosCuerpo.cedula, //ya que no se debe editar la cedula
        } as UsuarioEntity;
        try {
            await this._usuarioService.editarUno(usuarioEditado);
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario Editado')
        }catch (error) {
            console.error(error)
            return res.redirect('/usuario/vista/inicio?mensaje=Error editando usuario')
        }
    }


    /* -------------------- VISTAS -------------------- */
    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ) {
        const nombreControlador = 'Juan';
        return res.render(
            'usuario/ejemplo',  // nombre de la vista
            {                   // parametros de vista
                nombre: nombreControlador,
            })
    }

    @Get('vista/faq')
    faq(
        @Res() res
    ) {
        return res.render('usuario/faq')
    }

    @Get('vista/login')
    login(
        @Res() res
    ) {
        return res.render('usuario/login')
    }

    @Get('vista/inicio')
    async inicio(
        @Res() res,
        @Query() parametrosConsulta
    ) {
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos(parametrosConsulta.busqueda);
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando usuarios')
        }
        if (resultadoEncontrado) {
            res.render(
                'usuario/inicio',
                {
                    arregloUsuarios: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                })
        } else {
            throw new NotFoundException('No se encontraron usuarios')
        }
    }

    @Get('vista/deber')
    deber(
        @Res() res
    ) {
        return res.render('usuario/deber')
    }

    @Get('vista/crear')
    crearUsuarioVista(
        @Query() parametrosConsulta,
        @Res() res
    ) {
        return res.render(
            'usuario/crear',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
                cedula: parametrosConsulta.cedula
            }
        )
    }

    @Get('vista/editar/:id')
    async editarUsuarioVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ) {
        const id = Number(parametrosRuta.id)
        let usuarioEncontrado
        try {
            usuarioEncontrado = await this._usuarioService.buscarUno(id)
        } catch (e) {
            console.error('Error del servidor')
            return res.redirect('/usuario/vista/inicio?mensaje=Error buscando usuario')
        }
        if (usuarioEncontrado) {
            return res.render(
                'usuario/crear',
                {
                    error: parametrosConsulta.error,
                    usuario: usuarioEncontrado
                }
            )
        } else {
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario no encontrado')
        }
    }

}