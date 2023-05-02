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
        select: false,
        nullable: false
    })
    Password: string;

    @Column('text',{
        default: ['Web']

    })
    Web?: string;


    //Relacion 11 con cliente
    @OneToOne(
        () => Cliente,
        (cliente) => cliente.user
    )
    @JoinColumn()
    cliente?: Cliente

    //Disparadores 
    // @BeforeInsert()
    // formatoGithub(){
    //      if (!this.GitHub.includes('https://github.com/')){
    //         this.GitHub = `https://github.com/${this.GitHub}`
    //      }
    //  }
    
    // @BeforeInsert()
    // formatoWeb(){
    //     if (!this.Web.includes('https://')){
    //        this.Web = `https://${this.Web}`
    //     }
    // }

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @Column('bool', { default: true })
    isActive: boolean;


}
