import { IsString } from "class-validator";

export class CreateCarritoDto {

    @IsString()
    clienteID: string;
    
    @IsString()
    productoID: string;

    @IsString()
    Fecha_compra: string;
}
