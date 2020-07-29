import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {CalculadoraModule} from "./calculadora/calculadora.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Module({
    imports: [
        // Aqui van otros modulos
        HttpJuegoModule,
        CalculadoraModule,
        // UsuarioModule,
        // TypeOrmModule
        //     .forRoot({
        //         name: 'default',  // nombre conexion
        //         type: 'mysql',  // mysql, postgres
        //         host: 'localhost',  // ip
        //         port: 3306,  // puerto
        //         username: 'root',  // usuario
        //         password: 'root',  // pasword
        //         database: 'test',  // base de datos
        //         entities: [  // TODAS LAS ENTIDADES
        //             UsuarioEntity
        //         ],
        //         synchronize: true,  // Actualizar el esquema de la base de datos
        //         dropSchema: false,  // Eliminar Datos y el esquema de la base de datos
        //     }),
    ],
    controllers: [
        // Controladores APP MODULE
        AppController],
    providers: [
        // Servicios APP MODULE
        AppService],
})
export class AppModule {
}
