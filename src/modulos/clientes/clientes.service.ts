import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ) {

  }
  async create(createClienteDto: CreateClienteDto) {
    try {
      const cliente = this.clienteRepository.create(createClienteDto);
      await this.clienteRepository.save(cliente);
      return cliente;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda')
    }

  }

  async deleteAllClientes() {
    const query = this.clienteRepository.createQueryBuilder('cliente');
    try {
      return await query
        .delete()
        .where({})
        .execute()

    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail)

    throw new InternalServerErrorException('Please Check Server Error ...')
  }

  findAll() {
    return this.clienteRepository.find({
      
    });
  }

  findOne(ID: string) {
    return this.clienteRepository.findOne({
      where: {
        ID
      },
      relations: {
        carrito: true
      }
    });
  }


  update(ID: number, updateUsuarioDto: UpdateClienteDto) {
    return `This action updates a #${ID} cliente`;
  }

  remove(ID: number) {
    return `This action removes a #${ID} cliente`;
  }
}
