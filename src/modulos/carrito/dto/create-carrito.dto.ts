import { IsString } from "class-validator";

export class CreateCarritoDto {

    @IsString()
    ClienteID: string;
    
    @IsString()
    ProductoID: string;

    @IsString()
    Fecha_compra: string;
}
