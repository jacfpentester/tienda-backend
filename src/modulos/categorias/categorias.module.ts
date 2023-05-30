import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categoria } from './entities/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptionsReader } from 'typeorm';
import { Producto } from '../productos/entities/producto.entity';

@Module({
  controllers: [CategoriasController],
  providers: [CategoriasService],
  imports: [
    TypeOrmModule.forFeature([Categoria, Producto])
  ],
  exports:[
    CategoriasService
  ]
})
export class CategoriasModule {}
