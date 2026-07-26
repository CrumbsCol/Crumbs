/**
 * Estrategia JWT para Passport.
 * Extrae el token del header Authorization y valida el payload.
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  /**
   * Valida el payload del JWT y retorna el objeto user para req.user.
   */
  validate(payload: { sub: string }) {
    return { userId: payload.sub };
  }
}
