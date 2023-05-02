import { Module } from '@nestjs/common';
import { CarritosService } from './carritos.service';
import { CarritoController } from './carritos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from './entities/carrito.entity';
import { ProductosModule } from '../productos/productos.module';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  controllers: [CarritoController],
  providers: [CarritosService],
  imports: [
    ProductosModule, ClientesModule,
    TypeOrmModule.forFeature([Carrito])
  ],
  exports: [CarritosService]
})
export class CarritosModule {}
