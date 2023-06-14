import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientesService } from '../clientes/clientes.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { Proveedor } from './entities/proveedor.entity';
import { ProductosService } from '../productos/productos.service';

@Injectable()
export class ProveedoresService {
    constructor(
      @InjectRepository(Proveedor)
      private readonly proveedoresRepository: Repository<Proveedor>,
      //private readonly productosService: ProductosService
    ) {

    }
  async create(createProveedorDto: CreateProveedorDto) {

    try {
      const { ID, ...campos } = createProveedorDto;
      //const producto = this.productosService.findOne(ID);
      const proveedor = this.proveedoresRepository.create(createProveedorDto);
      // proveedor.producto = await this.productosService.findOne(ID);
      // //se lanza la petición al SGBD (postgres). Esperar (x seg)
      await this.proveedoresRepository.save(proveedor)
      return proveedor
    } catch (error) {
      return new InternalServerErrorException('Error en BD')
    }

  }

  async deleteAllProveedores() {
    const query = this.proveedoresRepository.createQueryBuilder('proveedor');
    try {
      return await query
        .delete()
        .where({})
        .execute();

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
    return this.proveedoresRepository.find({
      relations: {
        productos: true
      }
    });
  }

  findOne(ID: string) {
    return this.proveedoresRepository.findOne({
      where: {
        ID
      },
      relations: {
        productos: true,
      }
    });
  }

  async update(id: string, updateProveedorDto: UpdateProveedorDto): Promise<Proveedor> {
    const proveedor = await this.proveedoresRepository.findOneBy({ ID: id });

    if (!proveedor) {
      // Manejo del error si el proveedor no existe
      throw new Error('El proveedor no existe');
    }

    // Actualizar los campos necesarios del proveedor
    if (updateProveedorDto.Nombre) {
      proveedor.Nombre = updateProveedorDto.Nombre;
    }
dfsdfsd
    // Guardar los cdgsdgambiosgfasdfgdsfg
    const updatedProveedor = await this.proveedoresRepository.save(proveedor);

    return updatedProveedor;
  }

  remove(id: number) {
    return `This action removes a #${id} proveedores`;
  }
}
