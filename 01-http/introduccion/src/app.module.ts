import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {CalculadoraModule} from "./calculadora/calculadora.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MascotaEntity} from "./mascota/mascota.entity";
import {VacunaEntity} from "./vacuna/vacuna.entity";
import {MascotaModule} from "./mascota/mascota.module";
import {VacunaModule} from "./vacuna/vacuna.module";
import {ArtistaModule} from "./artista/artista.module";
import {ArtistaEntity} from "./artista/artista.entity";

@Module({
    imports: [
        // Aqui van otros modulos
        HttpJuegoModule,
        CalculadoraModule,
        UsuarioModule,
        MascotaModule,
        VacunaModule,
        ArtistaModule,
        TypeOrmModule
            .forRoot({
                name: 'default',  // nombre conexion
                type: 'mysql',  // mysql, postgres
                host: 'localhost',  // ip
                port: 3306,  // puerto
                username: 'root',  // usuario
                password: 'root',  // pasword
                database: 'test',  // base de datos
                entities: [  // TODAS LAS ENTIDADES
                    UsuarioEntity,
                    MascotaEntity,
                    VacunaEntity,
                    ArtistaEntity,
                ],
                synchronize: true,  // Actualizar el esquema de la base de datos
                dropSchema: false,  // Eliminar Datos y el esquema de la base de datos
            }),
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
