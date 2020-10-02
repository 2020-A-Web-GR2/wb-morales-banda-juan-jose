import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('artista')
export class ArtistaEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_artista',
    })
    idArtista: number;

    @Column({
        name: 'path_imagen',
        type: 'varchar',
        length: 500,
    })
    pathImagen: string;

    @Column({
        name: 'nombre',
        type: 'varchar',
        length: 30,
    })
    nombre: string;

    @Column({
        name: 'pais',
        type: 'varchar',
        length: 60,
    })
    pais: string;

    @Column({
        name: 'anio_debut',
        type: 'int',
    })
    anioDebut: number;

    @Column({
        name: 'genero',
        type: 'varchar',
        length: 30,
    })
    genero: string;

    @Column({
        name: 'cancion',
        type: 'varchar',
        length: 60,
    })
    cancion: string;

    @Column({
        name: 'discografia',
        type: 'varchar',
        length: 40,
    })
    discografia: string;
}