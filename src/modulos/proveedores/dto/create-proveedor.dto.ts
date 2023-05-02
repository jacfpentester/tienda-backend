import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateProveedorDto {

    @IsString()
    ID: string;

    @IsString()
    @MaxLength(20)
    Nombre: string;

    @IsString()
    @MaxLength(9)
    NIF: string;

    @IsString()
    @MaxLength(50)
    Direccion: string;

    @IsString()
    @MaxLength(12)
    Provincia: string;

    @IsString()
    @MaxLength(5)
    CP: string;

    @IsString()
    @MaxLength(9)
    Telefono: string;
}
