/**
 * DTO para el registro de un nuevo usuario.
 * Valida los campos requeridos del formulario de registro.
 */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  apellido: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  userName: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  fechaNacimiento?: string;
}
