/**
 * Guard que protege rutas con autenticación JWT.
 * Requiere un token Bearer válido en el header Authorization.
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
