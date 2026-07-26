import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SalidasService } from './salidas.service';
import { CreateSalidaDto } from './dto/create-salida.dto';
import { JoinSalidaDto } from './dto/join-salida.dto';
import { AddIntegranteDto } from './dto/add-integrante.dto';

@Controller('salidas')
@UseGuards(JwtAuthGuard)
export class SalidasController {
  constructor(private readonly salidasService: SalidasService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.salidasService.findAllByUser(req.user.userId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateSalidaDto) {
    return this.salidasService.create(req.user.userId, dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.salidasService.findOne(id, req.user.userId);
  }

  @Post('join')
  join(@Req() req: any, @Body() dto: JoinSalidaDto) {
    return this.salidasService.join(req.user.userId, dto.codigoInvitacion);
  }

  @Get(':id/fantasmas')
  async getFantasmas(@Param('id') id: string, @Req() req: any) {
    return this.salidasService.getFantasmas(id, req.user.userId);
  }

  @Post(':id/integrantes')
  addIntegrante(@Param('id') id: string, @Body() dto: AddIntegranteDto) {
    return this.salidasService.addIntegrante(id, dto);
  }
}
