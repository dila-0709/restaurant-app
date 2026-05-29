"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Restaurant API')
        .setDescription('API Documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    console.log('=================================');
    console.log('SWAGGER AKTIF DI: /api');
    console.log('=================================');
    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`APP RUNNING ON PORT: ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map