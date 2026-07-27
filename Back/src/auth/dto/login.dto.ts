/**
 * DTO para el inicio de sesión.
 * Acepta email o nombre de usuario como identificador.
 */
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  emailOrUsername: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
