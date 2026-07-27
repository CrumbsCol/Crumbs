import { Module } from '@nestjs/common';
import { SalidasController } from './salidas.controller';
import { SalidasService } from './salidas.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SalidasController],
  providers: [SalidasService],
})
export class SalidasModule {}
