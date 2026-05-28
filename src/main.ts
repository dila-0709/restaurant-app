async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setDescription('API Restaurant App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = Number(process.env.PORT) || 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`Server running on ${port}`);
}
bootstrap();
