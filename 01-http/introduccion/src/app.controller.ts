import {Body, Controller, Get, Post, Query, Req, Res, Session} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    // @Get()
    // getHello(): string {
    //     return this.appService.getHello();
    // }

    @Get()
    inicio(
        @Query() parametrosConsulta,
        @Res() res,
    ) {
        return res.redirect('login')
    }


    @Get('login')
    login(
        @Query() parametrosConsulta,
        @Res() response,
    ) {
        return response.render('login/login',
            {
                mensaje: parametrosConsulta.mensaje,
            }
        )
    }

    @Post('login')
    logginPost(
        @Body() parametrosConsulta,
        @Res() response,
        @Session() session,
    ) {
        // CONSULTAS DE LA BASE Y DTO
        const usuario = parametrosConsulta.usuario;
        const password = parametrosConsulta.password
        if (usuario == 'Adrian' && password == '1234') {
            session.usuario = usuario;
            return response.redirect('artista/vista/inicio?mensaje=Bienvenido ' + usuario)
        } else {
            return response.redirect('/login?mensaje=Credenciales incorrectas')
        }
        // if (usuario == 'juan' && password == '1234') {
        //     session.usuario = usuario;
        //     session.roles = ['Administrador'];
        //     return response.redirect('protegido')
        // } else {
        //     if (usuario == 'jose' && password == '4321') {
        //         session.usuario = usuario;
        //         session.roles = ['Supervisor'];
        //         return response.redirect('protegido')
        //     } else {
        //         return response.redirect('/login')
        //     }
        // }
    }

    @Get('protegido')
    protegido(
        @Res() response,
        @Session() session,
    ) {
        const estaLogeado = session.usuario;
        if (estaLogeado) {
            return response.render(
                'login/protegido',
                {
                    usuario: session.usuario,
                    roles: session.roles,
                }
            )
        } else {
            return response.redirect('login')
        }
    }

    @Get('logout')
    logout(
        @Res() response,
        @Session() session,
        @Req() request
    ) {
        session.username = undefined
        session.roles = undefined
        request.session.destroy();
        return response.redirect('login')
    }

}
