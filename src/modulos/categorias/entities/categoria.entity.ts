import { Producto } from "../../productos/entities/producto.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
@Entity('categorias')

export class Categoria {
    @PrimaryColumn()
    ID: string;

    @Column('text', {
        unique: true
    })
    Nombre: string;

    // Relacion 1-N Con Productos
    @OneToMany(
        () => Producto,
        (productos) => productos.categoria, {onDelete: 'CASCADE' })
    productos: Producto[];

    // Pasamos a Mayusculas Nombre
    @BeforeInsert()
    MayusTitulo(){
        this.Nombre = this.Nombre.toUpperCase()
        
    }
}
