import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {ArtistaService} from "./artista.service";
import {ArtistaCreateDto} from "./dto/artista.create-dto";
import {validate, ValidationError} from "class-validator";
import {ArtistaUpdateDto} from "./dto/artista.update-dto";
import {ArtistaEntity} from "./artista.entity";

@Controller('artista')
export class ArtistaController {

    constructor(
        private readonly _artistaService: ArtistaService,
    ) {
    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Session() session,
        @Res() res,
    ) {
        const estaLogeado = session.usuario
        if (estaLogeado) {
            const artistaValido = new ArtistaCreateDto()
            artistaValido.pathImagen = parametrosCuerpo.pathImagen;
            artistaValido.nombre = parametrosCuerpo.nombre;
            artistaValido.pais = parametrosCuerpo.pais;
            artistaValido.anioDebut = Number(parametrosCuerpo.anioDebut);
            artistaValido.genero = parametrosCuerpo.genero;
            artistaValido.cancion = parametrosCuerpo.cancion;
            artistaValido.discografia = parametrosCuerpo.discografia;

            let stringConsulta = `&pathImagen=${parametrosCuerpo.pathImagen}`
                + `&nombre=${parametrosCuerpo.nombre}`
                + `&pais=${parametrosCuerpo.pais}`
                + `&anioDebut=${parametrosCuerpo.anioDebut}`
                + `&genero=${parametrosCuerpo.genero}`
                + `&cancion=${parametrosCuerpo.cancion}`
                + `&discografia=${parametrosCuerpo.discografia}`

            if (!(parametrosCuerpo.pathImagen && parametrosCuerpo.nombre
                && parametrosCuerpo.pais && parametrosCuerpo.anioDebut
                && parametrosCuerpo.genero && parametrosCuerpo.cancion
                && parametrosCuerpo.discografia)) {
                const mensaje = 'Existen Campos Vacíos'
                return res.redirect('/artista/vista/crear?mensaje=' + mensaje + stringConsulta)
            }

            const errores: ValidationError[] = await validate(artistaValido)

            let respuesta;
            if (errores.length == 0) {
                try {
                    respuesta = await this._artistaService.crearUno(parametrosCuerpo)
                } catch (e) {
                    console.log('Error:', e)
                    const mensaje = 'Error del servidor creando artista.'
                    return res.redirect('/artista/vista/crear?mensaje=' + mensaje + stringConsulta)
                }
            } else {
                console.log('Errores:', errores)
                const mensaje = 'Error creando artista. Revise los campos.'
                return res.redirect('/artista/vista/crear?mensaje=' + mensaje + stringConsulta)
            }
            if (respuesta) {
                return res.redirect('/artista/vista/inicio?mensaje=Artista creado')
            } else {
                const mensaje = 'Error del servidor creando artista.'
                return res.redirect('/artista/vista/crear?mensaje=' + mensaje + stringConsulta)
            }
        } else {
            const mensaje = 'Debe estar logeado para crear artistas'
            return res.redirect('/login?mensaje=' + mensaje)
        }
    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Session() session,
        @Res() res,
    ) {
        const estaLogeado = session.usuario
        if (estaLogeado) {
            const idArtista = Number(parametrosRuta.id);

            const artistaValido = new ArtistaUpdateDto()
            artistaValido.pathImagen = parametrosCuerpo.pathImagen;
            artistaValido.nombre = parametrosCuerpo.nombre;
            artistaValido.pais = parametrosCuerpo.pais;
            artistaValido.anioDebut = Number(parametrosCuerpo.anioDebut);
            artistaValido.genero = parametrosCuerpo.genero;
            artistaValido.cancion = parametrosCuerpo.cancion;
            artistaValido.discografia = parametrosCuerpo.discografia;

            let stringConsulta = `&pathImagen=${parametrosCuerpo.pathImagen}`
                + `&nombre=${parametrosCuerpo.nombre}`
                + `&pais=${parametrosCuerpo.pais}`
                + `&anioDebut=${parametrosCuerpo.anioDebut}`
                + `&genero=${parametrosCuerpo.genero}`
                + `&cancion=${parametrosCuerpo.cancion}`
                + `&discografia=${parametrosCuerpo.discografia}`

            const errores: ValidationError[] = await validate(artistaValido)

            let respuesta;
            if (errores.length == 0) {
                const artistaEditado = {
                    idArtista: idArtista,
                    pathImagen: parametrosCuerpo.pathImagen,
                    nombre: parametrosCuerpo.nombre,
                    pais: parametrosCuerpo.pais,
                    anioDebut: Number(parametrosCuerpo.anioDebut),
                    genero: parametrosCuerpo.genero,
                    cancion: parametrosCuerpo.cancion,
                    discografia: parametrosCuerpo.discografia,
                } as ArtistaEntity;
                try {
                    respuesta = await this._artistaService.editarUno(artistaEditado)
                } catch (e) {
                    console.log('Error:', e)
                    const mensaje = 'Error del servidor editando artista.'
                    return res.redirect('/artista/vista/editar/' + idArtista + '?mensaje=' + mensaje + stringConsulta)
                }
            } else {
                console.log('Errores:', errores)
                const mensaje = 'Error editando artista. Se reestablecieron los campos.'
                return res.redirect('/artista/vista/editar/' + idArtista + '?mensaje=' + mensaje + stringConsulta)
            }
            if (respuesta) {
                return res.redirect('/artista/vista/inicio?mensaje=Artista editado')
            } else {
                const mensaje = 'Error del servidor creando artista.'
                return res.redirect('/artista/vista/editar/' + idArtista + '?mensaje=' + mensaje + stringConsulta)
            }
        } else {
            const mensaje = 'Debe estar logeado para editar artistas'
            return res.redirect('/login?mensaje=' + mensaje)
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarArtista(
        @Param() parametrosRuta,
        @Session() session,
        @Res() res,
    ) {
        const estaLogeado = session.usuario
        if (estaLogeado) {
            const idArtista = Number(parametrosRuta.id)
            try {
                await this._artistaService.eliminarUno(idArtista);
                return res.redirect('/artista/vista/inicio?mensaje=Artista eliminado')
            } catch (e) {
                console.log('Error:', e)
                return res.redirect('/artista/vista/inicio?mensaje=Error al eliminar artista')
            }
        } else {
            const mensaje = 'Debe estar logeado para eliminar artistas'
            return res.redirect('/login?mensaje=' + mensaje)
        }
    }

    /* -------------------- VISTAS -------------------- */
    @Get()
    artista(
        @Session() session,
        @Res() res,
    ) {
        const estaLogeado = session.usuario;
        if (estaLogeado) {
            return res.redirect('artista/vista/inicio')
        } else {
            const mensaje = 'Debe estar logeado para acceder a dicha pantalla'
            return res.redirect('/login?mensaje=' + mensaje)
        }
    }

    @Get('vista/inicio')
    async inicioArtista(
        @Query() parametrosConsulta,
        @Session() session,
        @Res() res,
    ) {
        const estaLogeado = session.usuario
        if (estaLogeado) {
            let resultado;
            try {
                resultado = await this._artistaService.buscarTodos(parametrosConsulta.busqueda)
            } catch (e) {
                console.log('Error:', e)
                const mensaje = 'Error al mostrar los artistas'
                return res.redirect('/artista/vista/inicio?mensaje=' + mensaje)
            }
            if (resultado) {
                return res.render(
                    'artista/inicio',
                    {
                        mensaje: parametrosConsulta.mensaje,
                        arregloArtistas: resultado,
                    }
                )
            } else {
                const mensaje = 'Error al mostrar los artistas'
                return res.redirect('/artista/vista/inicio?mensaje=' + mensaje)
            }
        } else {
            const mensaje = 'Debe estar logeado para acceder a dicha pantalla'
            return res.redirect('/login?mensaje=' + mensaje)
        }
    }

    @Get('vista/crear')
    async crearArtista(
        @Query() parametrosConsulta,
        @Session() session,
        @Res() res,
    ) {
        const estaLogeado = session.usuario
        if (estaLogeado) {
            return res.render(
                'artista/crear',
                {
                    mensaje: parametrosConsulta.mensaje,
                    pathImagen: parametrosConsulta.pathImagen,
                    nombre: parametrosConsulta.nombre,
                    pais: parametrosConsulta.pais,
                    anioDebut: parametrosConsulta.anioDebut,
                    genero: parametrosConsulta.genero,
                    cancion: parametrosConsulta.cancion,
                    discografia: parametrosConsulta.discografia,
                }
            )
        } else {
            const mensaje = 'Debe estar logeado para acceder a dicha pantalla'
            return res.redirect('/login?mensaje=' + mensaje)
        }
    }

    @Get('vista/editar/:id')
    async editarArtista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Session() session,
        @Res() res,
    ) {
        const estaLogeado = session.usuario
        if (estaLogeado) {
            const idArtista = Number(parametrosRuta.id)
            let artistaEncontrado;
            try {
                artistaEncontrado = await this._artistaService.buscarUno(idArtista);
            } catch (e) {
                console.log('Error:', e);
                return res.redirect('/artista/vista/inicio?mensaje=Error al buscar artista');
            }
            if (artistaEncontrado) {
                return res.render(
                    'artista/crear',
                    {
                        mensaje: parametrosConsulta.mensaje,
                        artista: artistaEncontrado,
                    }
                )
            }
        } else {
            const mensaje = 'Debe estar logeado para acceder a dicha pantalla'
            return res.redirect('/login?mensaje=' + mensaje)
        }
    }
}