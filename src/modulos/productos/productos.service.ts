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
      const productos = this.productosRepository.create({ ...campos });
      productos.categoria = await this.categoriaService.findOne(CategoriaID);
      productos.proveedores = await this.proveedoresService.findOne(ProveedorID);
      await this.productosRepository.save(productos)
      return productos
    } catch (error) {
      return new InternalServerErrorException('Error en BD')
    }
  }

  async deleteAllProductos() {
    const query = this.productosRepository.createQueryBuilder('productos');
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

  async update(id: string, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.productosRepository.findOneBy({ ID: id });

    if (!producto) {
      // Manejo del error si esl producto no existe
      throw new Error('El producto no existe');
    }

    // Actualizar los campos necesarios de la categoria
    if (updateProductoDto.Nombre) {
      producto.Nombre = updateProductoDto.Nombre;
    }
    if (updateProductoDto.Descripcion) {
      producto.Descripcion = updateProductoDto.Descripcion;
    }
    if (updateProductoDto.Precio) {
      producto.Precio = updateProductoDto.Precio;
    }
    if (updateProductoDto.Imagen) {
      producto.Imagen = updateProductoDto.Imagen;
    }

    // Guardar los cambios
    const updatedProducto = await this.productosRepository.save(producto);

    return updatedProducto;
  }
  remove(id: number) {
    return `This action removes a #${id} Productos`;
  }


}
