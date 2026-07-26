import { Module } from '@nestjs/common';
import { PagosController } from './pagos.controller';
import { BalancesController } from './balances.controller';
import { PagosService } from './pagos.service';

@Module({
  controllers: [PagosController, BalancesController],
  providers: [PagosService],
})
export class PagosModule {}
