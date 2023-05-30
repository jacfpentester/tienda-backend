import { IsNumber, IsString, MaxLength } from "class-validator";
import { Producto } from "src/modulos/productos/entities/producto.entity";
import { Cliente } from "src/modulos/clientes/entities/cliente.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
@Entity('proveedores')

export class Proveedor {
    
    @PrimaryColumn()
    ID: string;

    @Column('text',{
        unique: true
    })
    Nombre: string;

    @Column('text',{
        nullable: true
    })
    NIF: string;

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

    @Column('text',{
        nullable: true
    })
    Telefono: string;

    // //Relacion a clientes
    // @ManyToOne(
    //     () => Cliente,
    //     (cliente) => cliente.proveedores,
    //     {cascade: true}
    // )
    // cliente?: Cliente

     //Relacion a productos
     @OneToMany(
        () => Producto,
        (productos) => productos.proveedores,
        {cascade: true}
    )
    productos?: Producto

}
