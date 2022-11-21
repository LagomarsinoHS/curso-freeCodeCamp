import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  // Para eliminar todo lo de la bd, uso transaccion para que lo haga en el orden que yo quiero, en caso de
  // que haya problemas con las dependencias de las tablas
  cleanDb() {
    return this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
