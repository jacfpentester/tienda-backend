import { Carrito } from "../../carrito/entities/carrito.entity";
import { Categoria} from "../../categorias/entities/categoria.entity";
import { Proveedor } from "../../proveedores/entities/proveedor.entity";
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity('productos')

export class Producto {
    @PrimaryColumn()
    ID: string;

    @Column('text',{
        unique: true
    })
    Nombre: string;

    @Column('text',{
        nullable: true
    })
    Descripcion: string;

    @Column('numeric',{
        nullable: false
    })
    Precio: number;

    @Column('text',{
        nullable: true
    })
    Imagen: string;

    // Relacion N1 a categoria
    @ManyToOne(
        () => Categoria,
        (categoria) => categoria.producto,
        { cascade: false }
    )

    categoria?: Categoria

    // Relacion N1 a proveedor
    @ManyToOne(
        () => Proveedor,
        (proveedor) => proveedor.producto,
        { cascade: false,
          nullable: false
        }
    )

    proveedores?: Proveedor

    // Relacion 1N a carrito
    @OneToMany(
        () => Carrito,
        (carrito) => carrito.productos,
        { cascade: false,
          nullable: false }
    )

    carrito?:Carrito[];

    // Agregamos el iva al precio y ponemos Nombre en mayusculas.
    @BeforeInsert()
    precio_con_Iva(){
        this.Precio = this.Precio*1.21;
    }

    @BeforeInsert()
    MayusTitulo(){
        this.Nombre = this.Nombre.toUpperCase()
        
    }
}
