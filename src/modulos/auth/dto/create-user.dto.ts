import { IsEmail, IsIn, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    // @IsString()
    // ID: string;

    // @IsString()
    // UsuarioID: string;

    @IsEmail()
    @MaxLength(25)
    Email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    Password: string;

    // @IsOptional()
    // @IsString()
    // @MaxLength(20)
    // Web?: string;

    @IsString()
    @IsOptional()
    @MinLength(1)
    clienteID?:string;

    // @IsOptional()
    // @IsString()
    // @IsIn(['client','admin','normal'])
    // Roles?: string;
//     @IsOptional()
//     @IsString()
//     clienteID:string;
// 
}
