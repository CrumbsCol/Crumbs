import { IsOptional, IsString, MaxLength } from 'class-validator';

export class AddIntegranteDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  userName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(12)
  nombreFantasma?: string;
}
