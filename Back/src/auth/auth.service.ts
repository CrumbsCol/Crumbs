/**
 * Servicio de autenticación.
 * Maneja registro, login y consulta de perfil de usuario.
 */
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registra un nuevo usuario.
   * Valida unicidad de email y userName antes de crear.
   */
  async register(dto: RegisterDto) {
    // Verificar que email y userName no estén en uso
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { userName: dto.userName }],
      },
    });

    if (existingUser) {
      const field = existingUser.email === dto.email ? 'email' : 'userName';
      throw new ConflictException(`El ${field} ya está registrado`);
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Crear usuario
    const user = await this.prisma.user.create({
      data: {
        nombre: dto.nombre,
        apellido: dto.apellido,
        email: dto.email,
        userName: dto.userName,
        password: hashedPassword,
        fechaNacimiento: dto.fechaNacimiento ?? null,
      },
    });

    const accessToken = this.generateToken(user.id);

    return {
      accessToken,
      user: this.excludePassword(user),
    };
  }

  /**
   * Inicia sesión con email o userName.
   * Valida credenciales y retorna token + datos del usuario.
   */
  async login(dto: LoginDto) {
    // Buscar usuario por email o userName
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.emailOrUsername },
          { userName: dto.emailOrUsername },
        ],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const passwordValid = await bcrypt.compare(dto.password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const accessToken = this.generateToken(user.id);

    return {
      accessToken,
      user: this.excludePassword(user),
    };
  }

  /**
   * Obtiene el perfil del usuario autenticado.
   */
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.excludePassword(user);
  }

  /**
   * Genera un JWT con el userId como subject.
   */
  private generateToken(userId: string): string {
    return this.jwtService.sign({ sub: userId });
  }

  /**
   * Retorna el objeto user sin el campo password.
   */
  private excludePassword(user: any) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
