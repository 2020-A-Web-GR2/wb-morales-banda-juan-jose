import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArtistaController} from "./artista.controller";
import {ArtistaEntity} from "./artista.entity";
import {ArtistaService} from "./artista.service";

@Module({
    controllers: [
        ArtistaController,
    ],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    ArtistaEntity,
                ],
                'default'
            )
    ],
    providers: [
        ArtistaService,
    ],
})
export class ArtistaModule {

}