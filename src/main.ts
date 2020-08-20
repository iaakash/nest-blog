import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = 4000;

  await app.listen(port);
  Logger.log(`Listening on http://localhost:${port}`);
  
}
bootstrap(); 
