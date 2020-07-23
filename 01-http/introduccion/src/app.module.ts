import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {CalculadoraModule} from "./calculadora/calculadora.module";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
  imports: [
      // Aqui van otros modulos
      HttpJuegoModule,
      CalculadoraModule,
      UsuarioModule
  ],
  controllers: [
      // Controladores APP MODULE
    AppController],
  providers: [
      // Servicios APP MODULE
      AppService],
})
export class AppModule {}
