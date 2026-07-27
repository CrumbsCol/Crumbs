import { Controller, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';

@Controller('salidas/:salidaId/gastos')
@UseGuards(JwtAuthGuard)
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Post()
  create(
    @Param('salidaId') salidaId: string,
    @Body() dto: CreateGastoDto,
    @Req() req: any,
  ) {
    return this.gastosService.create(salidaId, dto, req.user.userId);
  }
}
