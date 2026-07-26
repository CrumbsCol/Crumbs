import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateSalidaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  titulo: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  descripcion?: string;
}
