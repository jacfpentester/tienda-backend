import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateProductoDto {

    @IsString()
    ID: string;
    
    @IsString()
    @MaxLength(20)
    Nombre: string;

    // @IsNumber()
    // GeneroID?: number;

    @IsString()
    @MaxLength(200)
    Descripcion: string;

    @IsNumber()
    Precio: number;

    @IsString()
    Imagen: string;

    @IsString()
    CategoriaID: string;

    @IsString()
    ProveedorID: string;
}
