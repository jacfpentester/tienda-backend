import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>
  ){

  }

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

  findOne(ID: string) {
    return this.categoriaRepository.findOne({
      where: { 
        ID 
      },
      relations: {
          producto: true,
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


  remove(id: number) {
    return `This action removes a #${id} categoria`;
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
