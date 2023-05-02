import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor} from './entities/proveedor.entity';
import { ClientesService } from '../clientes/clientes.service';
import { ClientesModule } from '../clientes/clientes.module';
import { ProductosModule } from '../productos/productos.module';

@Module({
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
  imports: [
    ClientesModule,
    TypeOrmModule.forFeature([Proveedor])
  ],
  exports: [
    ProveedoresService
  ]
})
export class ProveedoresModule {}
