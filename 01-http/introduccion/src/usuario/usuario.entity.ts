import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity('epn_usuario')  // nombre dela tabla en la base de datos
export class UsuarioEntity {

    @Index([
        'nombre',
        'apellido',
        'cedula',
        'fechaNacimiento'  // Nombres de las propiedades en la clase,
    ])

    // @Index(
    //     ['nombre', 'apellido', 'cedula'],
    //     {unique: true}
    // )

    @PrimaryGeneratedColumn({
        unsigned: true,  // para quitar el signo y trabajar solo con positivos
        comment: 'Identificador',  // comentarios
        name: 'id',  // nombre
    })
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        length: 60,  // longitud del tipo
        nullable: true,  // para permitir que sea nulo
    })
    nombre?: string;  // por ende especificar que puede ser vacio con ?

    @Column({
        name: 'apellido',
        type: 'varchar',
        length: 60,
        nullable: true,
    })
    apellido?: string;

    @Column({
        name: 'cedula',
        type: 'varchar',
        length: 18,
        nullable: false,
        unique: true,  // para que sea único
    })
    cedula: string;

    @Column({
        name: 'sueldo',
        nullable: true,
        type: 'decimal',
        precision: 10,  // parte entera
        scale: 4,  // parte decimal
    })
    sueldo?: number;

    @Column({
        name: 'fecha_nacimiento',
        nullable: true,
        type: 'date',
    })
    fechaNacimiento?: string;

    @Column({
        name: 'fecha_hora_nacimiento',
        nullable: true,
        type: 'datetime',
    })
    fechaHoraNacimiento?: string;

}