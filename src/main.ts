import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
      persistAuthorization: true, // biar token tidak hilang
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
