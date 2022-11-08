import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Se agrega esto para que tome en consideración los class-validator de los DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo tomará los valores definidos en DTO, lo otro lo ignora
    }),
  );

  await app.listen(3000);
}
bootstrap();
