import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, CreateUserDto } from './dto/index';
import { ClientesService } from '../clientes/clientes.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly clientesService: ClientesService,
    private readonly jwtService: JwtService
  ){}

  async login(loginUserDto: LoginUserDto) {
    try {
      const { Email, Password } = loginUserDto;
      const user = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.Email', 'user.Password', 'user.Roles', 'user.clienteID'])
        .where('user.Email = :Email', { Email })
        .getOne();
  
      if (!user) {
        throw new UnauthorizedException('Credenciales no válidas (email)');
      }
  
      if (!bcrypt.compareSync(Password, user.Password)) {
        throw new UnauthorizedException('Credenciales no válidas (contraseña)');
      }
  
      return {
        user: { ...user },
        token: this.getJwtToken({ Email: user.Email }),
      };
  
    } catch (error) {
      console.log('Error al intentar iniciar sesión:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
  
      throw new InternalServerErrorException('Ocurrió un error al intentar iniciar sesión');
    }
  }
  


  async create(createUserDto: CreateUserDto) {
    try {
      const { Password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        Password: bcrypt.hashSync( Password, 10 )
      });
      await this.userRepository.save(user);

      return {
        user: { ...user }, 
        token: this.getJwtToken({ Email: user.Email })
      }

    } catch (error) {
      console.log('El medio', error);
      this.handleDBErrors(error)
    }
  }

  private handleDBErrors (error: any): never{
    if (error.code === '23505')
    console.log('Final:', error);
      throw new BadRequestException(error)
    
    throw new InternalServerErrorException(error)
  }

  private getJwtToken( payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  async deleteAllUsers(){
    const query = this.userRepository.createQueryBuilder('user');
    try{
      return await query
              .delete()
              .where({})
              .execute();
    }catch(error){
      this.handleDBErrors( error )
    }
  }
}