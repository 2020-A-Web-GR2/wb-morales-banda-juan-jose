import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ArtistaEntity} from "./artista.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

@Injectable()
export class ArtistaService {

    constructor(
        @InjectRepository(ArtistaEntity)
        private repositorio: Repository<ArtistaEntity>
    ) {
    }

    crearUno(nuevoArtista: ArtistaEntity) {
        return this.repositorio.save(nuevoArtista);
    }

    buscarTodos(textoConsulta?: string) {
        const consulta: FindManyOptions<ArtistaEntity> = {
            where: [
                {
                    nombre: Like(`%${textoConsulta}%`)
                },
                {
                    cancion: Like(`%${textoConsulta}%`)
                },
                {
                    genero: Like(`%${textoConsulta}%`)
                },
                {
                    discografia: Like(`%${textoConsulta}%`)
                },
                {
                    pais: Like(`%${textoConsulta}%`)
                },
            ],
        }
        if (textoConsulta === undefined) {
            return this.repositorio.find();
        } else {
            return this.repositorio.find(consulta);
        }
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id);
    }

    editarUno(artistaEditado: ArtistaEntity) {
        return this.repositorio.save(artistaEditado)
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }
}