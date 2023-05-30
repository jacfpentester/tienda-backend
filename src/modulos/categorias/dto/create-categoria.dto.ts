import { IsNumber, IsString, MaxLength } from "class-validator";
import { IsNull } from "typeorm";

export class CreateCategoriaDto {
    @IsString()
    ID: string;

    @IsString()
    Nombre: string;
}
