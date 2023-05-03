import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto.ts';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientesService } from '../clientes/clientes.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly clientesService: ClientesService,
    private readonly jwtService: JwtService
  ){}

  async login( loginUserDto: LoginUserDto ){
    try {
      const { Email, Password } = loginUserDto;
      const user = await this.userRepository.findOne({ 
        where: { Email },
        select: { Email: true, Password: true, roles: true, FullName: true }
       });

      if ( !user ) 
        throw new UnauthorizedException ('Credenciales no válidas (email)');

      if (!bcrypt.compareSync( Password, user.Password ))
        throw new UnauthorizedException('Credenciales no válidas (email)')
      
      return {
        user: { ...user }, 
        token: this.getJwtToken({ Email: user.Email })
      }
      
    } catch (error) {
      this.handleDBErrors(error)
    }
  }
  async create(createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto);
      const { clienteID, Password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,clienteID,
        Password: bcrypt.hashSync( Password, 10 )
      });
      await this.userRepository.save(user);

      return {
        user: { ...user }, 
        token: this.getJwtToken({ Email: user.Email })
      }

    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  private handleDBErrors (error: any): never{
    if (error.code === '23505')
      throw new BadRequestException(error.detail)
    
    throw new InternalServerErrorException('Please Check Server Error ...')
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