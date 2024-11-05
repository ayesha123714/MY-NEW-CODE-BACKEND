import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin:'http://localhost:3001',
    methods: 'POST,GET',
    allowedHeaders:'Content-Type,Authorization',
  })
  await app.listen(3000);
}
bootstrap();
