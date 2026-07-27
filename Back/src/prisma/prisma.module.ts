import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Módulo global de Prisma.
 * Al ser @Global, PrismaService queda disponible en toda la app
 * sin necesidad de importar PrismaModule en cada módulo.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
