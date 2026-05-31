import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 ENABLE CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    credentials: true,
  });

  // 🔥 Global prefix (WAJIB untuk production API)
  app.setGlobalPrefix('api');

  // 🔥 Swagger config + JWT Bearer Auth
  const config = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // 🔥 Swagger endpoint (production safe)
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  console.log('=================================');
  console.log('SWAGGER AKTIF DI: /api/docs');
  console.log('API PREFIX: /api');
  console.log('=================================');

  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`APP RUNNING ON PORT: ${port}`);
}

bootstrap();
