import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Producto } from '../productos/entities/producto.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class CategoriasService {

  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    // private readonly productoRepository: Repository<Producto>,
    private readonly connection: Connection
  ) {}
  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const { ID, ...campos } = createCategoriaDto;
      const categoria = this.categoriaRepository.create(createCategoriaDto);
      await this.categoriaRepository.save(categoria)
      return categoria

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda')
    }
  }

  findAll() {
    return this.categoriaRepository.find({});
  }


  
  


  // async findOne(ID: string) {
  //   return this.categoriaRepository.findOne({
  //     where: {
  //       ID: ID
  //     },
  //     relations: {
  //       producto: true,
  //     }
  //   });
  // }
  


  findOne(ID: string) {
    return this.categoriaRepository.findOne({
      where: { 
        ID 
      },
      relations: {
          productos: true,
      }
    });
  }

  // update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
  //   return `This action updates a #${id} categoria`;
  // }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOneBy({ ID: id });

    if (!categoria) {
      // Manejo del error si la categoria no existe
      throw new Error('La categoria no existe');
    }

    // Actualizar los campos necesarios de la categoria
    if (updateCategoriaDto.Nombre) {
      categoria.Nombre = updateCategoriaDto.Nombre;
    }

    // Guardar los cambios
    const updatedCategoria = await this.categoriaRepository.save(categoria);

    return updatedCategoria;
  }


  // remove(id: string) {
  //   return this.categoriaRepository.delete(id);
  // }

  async remove(id: string): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
  
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
  
      const categoria = await queryRunner.manager
        .getRepository(Categoria)
        .createQueryBuilder('categoria')
        .leftJoinAndSelect('categoria.productos', 'producto')
        .where('categoria.ID = :id', { id })
        .getOne();
  
      if (!categoria) {
        throw new NotFoundException('La categoría no existe');
      }
  
      // Eliminar los productos relacionados
      for (const producto of categoria.productos) {
        await queryRunner.manager.remove(producto);
      }
  
      // Eliminar la categoría
      await queryRunner.manager.remove(categoria);
  
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
  
      if (error.code === '23503') {
        throw new BadRequestException('No se puede eliminar la categoría debido a restricciones de clave externa');
      } else {
        throw new InternalServerErrorException('Error al eliminar la categoría');
      }
    } finally {
      await queryRunner.release();
    }
  }
  
  
  
  
  

  async deleteAllCategorias(){
    const query = this.categoriaRepository.createQueryBuilder('Categoria');
    try {
      return await query
        .delete()
        .where({})
        .execute();

    }catch(error){
      this.handleDBErrors (error)
    }
  }

  private handleDBErrors (error: any): never{
    if (error.code === '23505')
      throw new BadRequestException(error.detail)

    throw new InternalServerErrorException('Please Check Server Error ...')
  }
}
