import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SalidasModule } from './salidas/salidas.module';
import { GastosModule } from './gastos/gastos.module';
import { PagosModule } from './pagos/pagos.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, SalidasModule, GastosModule, PagosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
