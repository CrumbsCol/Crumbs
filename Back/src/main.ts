import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './shared/prisma-exception.filter';

async function bootstrap() {
  if (!process.env.JWT_SECRET) {
    console.error('❌ Error: JWT_SECRET no está definido en las variables de entorno');
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);

  // Prefijo global — todas las rutas empiezan con /api
  app.setGlobalPrefix('api');

  // CORS — permitir peticiones del frontend
  app.enableCors({
    origin: [
      'http://localhost:4200', // Angular dev
      'http://localhost:80',   // Nginx local
    ],
    credentials: true,
  });

  // ValidationPipe global — valida DTOs con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,    // Elimina propiedades no declaradas en el DTO
      transform: true,    // Transforma payloads al tipo del DTO
      forbidNonWhitelisted: true, // Rechaza propiedades no declaradas
    }),
  );

  // PrismaExceptionFilter — convierte errores de Prisma en respuestas HTTP
  app.useGlobalFilters(new PrismaExceptionFilter());

  const port = process.env.PORT ?? 8000;
  await app.listen(port);
  console.log(`🚀 Crumbs Backend corriendo en http://localhost:${port}/api`);
}
bootstrap();
