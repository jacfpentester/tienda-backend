import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateClienteDto {
    @IsString()
    ID: string;

    @IsString()
    @MaxLength(20)
    Nombre: string;

    @IsString()
    @MaxLength(10)
    Apellido1: string;

    @IsString()
    @MaxLength(10)
    Apellido2: string;

    @IsString()
    @MaxLength(9)
    DNI: string;

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
    Fecha_nacimiento: string;

    @IsString()
    @MaxLength(9)
    Telefono: string;
}
