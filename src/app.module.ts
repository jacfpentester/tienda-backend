import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarritosModule } from './modulos/carrito/carritos.module';
import { CategoriasModule } from './modulos/categorias/categorias.module';
import { ProductosModule } from './modulos/productos/productos.module';
import { AuthModule } from './modulos/auth/auth.module';
import { ClientesModule } from './modulos/clientes/clientes.module';
import { ProveedoresModule } from './modulos/proveedores/proveedores.module';
import { SeedModule } from './modulos/seed/seed.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    // username: process.env.DB_USER,
    //password: process.env.DB_PASS,
    username: "jacf",
    password:"pswtienda",
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true
  }), ClientesModule, ProductosModule, ProveedoresModule, CategoriasModule, CarritosModule, AuthModule, SeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
