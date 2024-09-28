import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // This will remove any additional properties that are not defined in the DTO
      forbidNonWhitelisted: true, // This will throw an error if any additional properties are found
      transform: true, // This will transform the incoming data to the DTO type
    }),
  );
  await app.listen(3000);
}
bootstrap();
