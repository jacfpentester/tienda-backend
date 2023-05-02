import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriasService } from '../categorias/categorias.service';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,
    private readonly categoriaService: CategoriasService,
    private readonly proveedoresService: ProveedoresService,
  ) {

  }
  async create(createProductoDto: CreateProductoDto) {

    try {
      const { CategoriaID, ProveedorID, ...campos } = createProductoDto;
      const categoria = this.categoriaService.findOne(CategoriaID);
      const proveedor = this.proveedoresService.findOne(ProveedorID);
      const productos = this.productosRepository.create({ ...campos });
      productos.categoria = await this.categoriaService.findOne(CategoriaID);
      productos.proveedores = await this.proveedoresService.findOne(ProveedorID);
      // //se lanza la petición sl SGBD (postgres). Esperar (x seg)
      await this.productosRepository.save(productos)
      return productos
    } catch (error) {
      return new InternalServerErrorException('Error en BD')
    }
  }

  async deleteAllProductoss() {
    const query = this.productosRepository.createQueryBuilder('productos');
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
    return this.productosRepository.find({
      relations: {
        categoria: true,
        proveedores: true,
      }
    });
  }

  findOne(ID: string) {
    return this.productosRepository.findOne({
      where: {
        ID
      },
      relations: {
        carrito: true,
        proveedores: true,
      }
    });


  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} Productos`;
  }

  remove(id: number) {
    return `This action removes a #${id} Productos`;
  }


}
