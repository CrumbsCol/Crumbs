import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsArray,
  ValidateNested,
  IsIn,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ParticipanteDto } from './participante.dto';

export class CreateGastoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  descripcion?: string;

  @IsInt()
  @Min(1)
  @Max(9999999)
  monto: number;

  @IsString()
  @IsNotEmpty()
  fecha: string;

  @IsIn(['equitativo', 'manual'])
  metodoDivision: 'equitativo' | 'manual';

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  pagadoPorMiembroId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipanteDto)
  participantes: ParticipanteDto[];
}
