import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PagosService } from './pagos.service';

@Controller('salidas/:salidaId/balances')
@UseGuards(JwtAuthGuard)
export class BalancesController {
  constructor(private readonly pagosService: PagosService) {}

  @Get()
  getBalances(@Param('salidaId') salidaId: string, @Req() req: any) {
    return this.pagosService.getBalances(salidaId, req.user.userId);
  }
}
