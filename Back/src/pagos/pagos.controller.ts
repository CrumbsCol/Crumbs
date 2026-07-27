import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';

@Controller('salidas/:salidaId/pagos')
@UseGuards(JwtAuthGuard)
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  create(
    @Param('salidaId') salidaId: string,
    @Body() dto: CreatePagoDto,
    @Req() req: any,
  ) {
    return this.pagosService.create(salidaId, dto, req.user.userId);
  }

  @Patch(':pagoId/confirmar')
  confirm(
    @Param('salidaId') salidaId: string,
    @Param('pagoId') pagoId: string,
    @Req() req: any,
  ) {
    return this.pagosService.confirm(salidaId, pagoId, req.user.userId);
  }
}
