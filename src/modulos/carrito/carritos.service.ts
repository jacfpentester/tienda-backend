import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductosService } from '../productos/productos.service';
import { ClientesService } from '../clientes/clientes.service';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { Carrito } from './entities/carrito.entity';

@Injectable()
export class CarritosService {
  constructor(
    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>,
    private readonly productosService: ProductosService,
    private readonly clientesService: ClientesService
  ) {

  }
  async create(createCarritoDto: CreateCarritoDto) {

    try {
      const { ProductoID, ClienteID, ...campos } = createCarritoDto;
      // console.log({...campos});
      const producto = this.productosService.findOne(ProductoID);
      const cliente = this.clientesService.findOne(ClienteID);
      const carrito = this.carritoRepository.create({ ...campos });
      carrito.productos = await this.productosService.findOne(ProductoID);
      carrito.cliente = await this.clientesService.findOne(ClienteID);
      // //se lanza la petición sl SGBD (postgres). Esperar (x seg)
      await this.carritoRepository.save(carrito)
      return carrito
    } catch (error) {
      return new InternalServerErrorException('Error en BD')

    }


  }

  async deleteAllCarrito() {
    const query = this.carritoRepository.createQueryBuilder('carrito');
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
    return this.carritoRepository.find({
      relations: {
        cliente: true,
        productos: true,
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} Carrito`;
  }

  update(id: number, updateCarritoDto: UpdateCarritoDto) {
    return `This action updates a #${id} Carrito`;
  }

  remove(id: number) {
    return `This action removes a #${id} Carrito`;
  }
}
