import { IsString, IsNotEmpty, IsUUID, IsInt, Min, IsOptional } from 'class-validator';

export class CreatePagoDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  deudorId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  pagadorId: string;

  @IsInt()
  @Min(1)
  monto: number;

  @IsOptional()
  @IsString()
  @IsUUID()
  gastoId?: string;
}
