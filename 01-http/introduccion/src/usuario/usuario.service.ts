import {Injectable} from "@nestjs/common";
import {
    Between,
    FindManyOptions, In, IsNull,
    LessThan,
    LessThanOrEqual,
    Like,
    MoreThan,
    MoreThanOrEqual,
    Not,
    Repository
} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsuarioService {
    constructor(  // Inyección de Dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ) {
    }

    crearUno(nuevoUsuario: UsuarioEntity) {
        return this.repositorio.save(nuevoUsuario); //promesa
    }

    buscarTodos(textoDeConsulta?: string) {
        /*
        let busquedaEjemplo: FindManyOptions<UsuarioEntity>
        // Buscar y relacionar
        busquedaEjemplo = {
            relations: ['mascotas', 'mascotas.vacunas']
        }

        // Buscar con WHERE
        // Similar a las bases de datos
        busquedaEjemplo = {
            where: {
                nombre: 'Juan Jose',  // Busqueda exacta AND
                apellido: 'Morales'  // Busqueda exacta
            }
        }

        // Buscqueda ordenada
        busquedaEjemplo = {
            order: {
                nombre: 'ASC',  // ASCENDENTE
                id: 'DESC'  // DESCENDENTE
            }
        }

        // Buscar por páginas
        busquedaEjemplo = {
            skip: 0,  // de 100 registros saltate 0 registros
            take: 10  // de 100 registros agarra 10
        }

        // Busqueda con WHERE y OR
        busquedaEjemplo = {
            where: [
                {
                    nombre: 'Juan Jose'
                }, // OR
                {
                    apellido: 'Juan Jose'
                }
            ]
        }

        // Busqueda WHERE con OR y AND
        busquedaEjemplo = {
            where: [
                {
                    nombre: 'Juan Jose', // AND
                    apellido: 'Morales'
                }, // OR
                {
                    nombre: 'Morales', // AND
                    apellido: 'Juan'
                }
            ]
        }

        // Busqueda Not
        busquedaEjemplo = {
            where: {
                nombre: Not('Juan Jose')
            }
        }

        // Busqueda LessThan
        busquedaEjemplo = {
            where: {
                fechaNacimiento: LessThan('1998-09-08')
            }
        }

        // Busqueda LessThanOrEqual
        busquedaEjemplo = {
            where: {
                fechaNacimiento: LessThanOrEqual('1998-09-08')
            }
        }

        // Busqueda MoreThan
        busquedaEjemplo = {
            where: {
                fechaNacimiento: MoreThan('1998-09-08')
            }
        }

        // Busqueda MoreThanOrEqual
        busquedaEjemplo = {
            where: {
                fechaNacimiento: MoreThanOrEqual('1998-09-08')
            }
        }

        // Busqueda Like
        busquedaEjemplo = {
            where: {
                nombre: Like('%os%')
            }
        }

        // Busqueda Between
        busquedaEjemplo = {
            where: {
                fechaNacimiento: Between('1998-09-08', '2020-01-21')
            }
        }

        // Busqueda In
        busquedaEjemplo = {
            where: {
                pokemon: In([1, 2, 5, 6, 7, 8, 20, 30])
            }
        }

        // Busqueda Null
        busquedaEjemplo = {
            where: {
                casado: IsNull()
            }
        }
        */

        const consulta: FindManyOptions<UsuarioEntity> = {
            where : [
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                },
                {
                    apellido: Like(`%${textoDeConsulta}%`)
                },
                {
                    cedula: Like(`%${textoDeConsulta}%`)
                }
            ]
        }

        return this.repositorio.find(consulta);  //promesa
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id);  //promesa
    }

    editarUno(usuarioEditado: UsuarioEntity) {
        return this.repositorio.save(usuarioEditado)
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }
}