import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Api de la Tienda Realizada por Jose Antonio Cervantes READY!';
  }
}
