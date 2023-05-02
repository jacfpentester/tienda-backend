import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateCategoriaDto {
    @IsString()
    ID: string;
    
    @IsString()
    Nombre: string;
}
