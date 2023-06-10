import { Cliente} from "../../clientes/entities/cliente.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity('users')

export class User {
    @PrimaryGeneratedColumn('increment')
    ID: string;

    @Column('text',{
        nullable: true,
        unique: true
    })
    Email: string;

    @Column('text',{
        nullable: true
    })
    FullName: string;

    @Column('text',{
        nullable: true
    })
    clienteID?: string;


    @Column('text', { 
        select: false
    })
    Password: string;

    @Column('text',{
        default: ['Web']
    })
    Web?: string;

    //Relacion 1 a 1 con cliente
    @OneToOne(
        () => Cliente,
        (cliente) => cliente.user,
        { cascade: true, eager: true }
    )
    @JoinColumn()
    cliente: Cliente;

    @Column('text', {
        default: ['client']
    })
    Roles: string[];

    @Column('boolean', { 
        default: true 
    })
    IsActive: boolean;

   

}
