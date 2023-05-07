import { Carrito } from "src/modulos/carrito/entities/carrito.entity";
import { Producto } from "src/modulos/productos/entities/producto.entity";
import { User } from "src/modulos/auth/entities/user.entity";
import { Proveedor } from "src/modulos/proveedores/entities/proveedor.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
@Entity('clientes')

export class Cliente {
    
    @PrimaryColumn()
    ID: string;

    @Column('text',{
        unique: true
    })
    Nombre: string;

    @Column('text',{
        nullable: true
    })
    Apellido1: string;

    @Column('text',{
        nullable: true
    })
    Apellido2: string;

    @Column('text',{
        nullable: true
    })
    DNI: string;

    @Column('text',{
        nullable: true
    })
    Direccion: string;

    @Column('text',{
        nullable: true
    })
    Provincia: string;

    @Column('text',{
        nullable: true
    })
    CP: string;

    @Column('date',{
        unique: false,
        nullable: false
    })
    Fecha_nacimiento: Date;

    @Column('text',{
        nullable: true
    })
    Telefono: string;


    //Relacion 1-1 Con User (Auth)
    // @OneToOne(
    //     () => User,
    //     (user) => user.cliente,
    //     { cascade:false }
    // )
    // user?: User

    //Relacion uno a uno al Carrito
    @OneToOne(
        () => Carrito,
        (carrito) => carrito.cliente,{ 
            eager:true,
            onDelete:"CASCADE"    
        }
    )
    carrito?: Carrito

}
