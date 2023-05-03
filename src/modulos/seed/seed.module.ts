import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CategoriasModule } from '../categorias/categorias.module';
import { AuthModule } from '../auth/auth.module';
import { CarritosModule } from '../carrito/carritos.module';
import { ProductosModule } from '../productos/productos.module';
import { ClientesModule } from '../clientes/clientes.module';
import { ProveedoresModule } from '../proveedores/proveedores.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ CategoriasModule, AuthModule, CarritosModule, ProductosModule, ClientesModule, ProveedoresModule]
})
export class SeedModule {}
