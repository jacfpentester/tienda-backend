import { Producto } from "../../productos/entities/producto.entity";
import { Cliente} from "../../clientes/entities/cliente.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('carrito')

export class Carrito {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column('date',{
        unique: false,
        nullable: false
    })
    Fecha_compra: Date;

    //Relacion N1 a Productos
    @ManyToOne(
        () => Producto,
        (producto) => producto.carrito,
        {cascade: true,
            nullable: false
        }
    )
    productos?: Producto

    //Relacion 11 a Clientes
    @OneToOne(
        () => Cliente,
        (cliente) => cliente.carrito,
        {cascade: true,
            nullable: false
        }
    )
    @JoinColumn()
    cliente?: Cliente
    
}
