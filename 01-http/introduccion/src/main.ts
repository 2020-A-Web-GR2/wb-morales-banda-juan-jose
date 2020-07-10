import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';  // Importar en TS
const cookieParser = require('cookie-parser')  // Importar en JS

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // AQUI CONFIGURAR CUALQUIER COSA
    app.use(cookieParser())
    await app.listen(3001);
}

bootstrap();
