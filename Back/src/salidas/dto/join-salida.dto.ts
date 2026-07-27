import { IsString, Length } from 'class-validator';

export class JoinSalidaDto {
  @IsString()
  @Length(6, 6)
  codigoInvitacion: string;
}
