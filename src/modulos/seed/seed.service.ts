import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CarritosService } from '../carrito/carritos.service';
import { CategoriasService } from '../categorias/categorias.service';
import { ProductosService } from '../productos/productos.service';
import { ClientesService } from '../clientes/clientes.service';
import { ProveedoresService } from '../proveedores/proveedores.service';
import dataCategorias from './datos/categorias.json';
import dataClientes from './datos/clientes.json';
import dataAuth from './datos/users.json';
import dataProveedores from './datos/proveedores.json';
import dataProductos from './datos/productos.json';
import dataCarrito from './datos/carrito.json';

@Injectable()
export class SeedService {
  constructor(
    private readonly categoriasService: CategoriasService,
    private readonly productosService: ProductosService,
    private readonly carritosService: CarritosService,
    private readonly authService: AuthService,
    private readonly clientesService: ClientesService,
    private readonly proveedoresService: ProveedoresService
  ) { }

  async importar() {
    await this.insertNewCategorias();
    await this.insertNewClientes();
    await this.insertNewAuth();
    await this.insertNewProveedores();
    await this.insertNewProductos();
    await this.insertNewCarritos();

    return "Datos Importados Correctamente";
  }



  private async insertNewCategorias() {
 //   await this.categoriasService.deleteAllCategorias();
    const insertPromises = [];
    dataCategorias.forEach(categoria => {
      insertPromises.push(this.categoriasService.create(categoria))
    })
    await Promise.all(insertPromises);
  }

  private async insertNewClientes() {
//    await this.clientesService.deleteAllClientes();
    const insertPromises = [];
    dataClientes.forEach((cliente) => {
      insertPromises.push(this.clientesService.create(cliente))
    })
    await Promise.all(insertPromises);
  }

  private async insertNewAuth() {
 //   await this.authService.deleteAllUsers();
    const insertPromises = [];
    dataAuth.forEach(user => {
      insertPromises.push(this.authService.create(user))
    })
    await Promise.all(insertPromises);
  }

  private async insertNewProveedores() {
//    await this.proveedoresService.deleteAllProveedores();
    const insertPromises = [];
    dataProveedores.forEach(proveedor => {
      insertPromises.push(this.proveedoresService.create(proveedor))
    })
    await Promise.all(insertPromises);
  }

  private async insertNewProductos() {
    const insertPromises = [];
//    await this.productosService.deleteAllProductos();
    dataProductos.forEach(producto => {
      insertPromises.push(this.productosService.create(producto))
    })
    await Promise.all(insertPromises);
  }

  private async insertNewCarritos() {
//    await this.carritosService.deleteAllCarritos();
    const insertPromises = [];
    dataCarrito.forEach(carrito => {
      insertPromises.push(this.carritosService.create(carrito))
    })
    await Promise.all(insertPromises);
  }

  findAll() {
    return `This action returns all seed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seed`;
  }

  remove(id: number) {
    return `This action removes a #${id} seed`;
  }
}