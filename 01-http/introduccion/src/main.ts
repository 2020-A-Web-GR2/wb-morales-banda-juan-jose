import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';  // Importar en TS
const cookieParser = require('cookie-parser')  // Importar en JS
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

async function bootstrap() {
    const app = await NestFactory.create(AppModule) as any;
    // AQUI CONFIGURAR CUALQUIER COSA
    //app.use(cookieParser())
    // app.use(cookieParser('Me gusta el hornado de ibarra'))
    app.use(cookieParser('DelUnoAlOchoEnLetras'));
    app.set('view engine' , 'ejs');
    app.use(express.static('publico'));
    app.use(
        session({
            name: 'server-session-id',
            secret: 'No sera de tomar un traguito',
            resave: true,
            saveUninitialized: true,
            cookie: {secure: false},
            store: new FileStore(),
        }),
    );
    
    await app.listen(3001);
}

bootstrap();
