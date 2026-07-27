import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsBoolean,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class ParticipanteDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  salidaMiembroId: string;

  @IsBoolean()
  esInvitado: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  montoManual?: number | null;
}
