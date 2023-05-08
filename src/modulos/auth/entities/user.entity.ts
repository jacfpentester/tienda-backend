import { Cliente} from "../../clientes/entities/cliente.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity('users')

export class User {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column('text',{
        nullable: true
    })
    Email: string;

    @Column()
    FullName: string;

    @Column('text', { 
        select: false
    })
    Password: string;

    @Column('text',{
        default: ['Web']

    })
    Web?: string;

    // @Column('text',{
    //     nullable: true,
    //     unique:true
    // })
    // clienteID: string;

    //Relacion 11 con cliente
    @OneToOne(
        () => Cliente,
        (cliente) => cliente.user )
    @JoinColumn()
    cliente?: Cliente

    @Column('text', {
        array: true,
        default: ['user']
    })
    Roles: string[];

    @Column('bool', { default: true })
    IsActive: boolean;

   

}
