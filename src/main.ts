import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes( new ValidationPipe())

  const config = new DocumentBuilder()
        .setTitle('Pet Store')
        .setDescription('Simple Rest API...')
        .setVersion('1.0')
        .addBearerAuth(
          { 
            description: `[just text field] Please enter token in following format: Bearer <JWT>`,
            name: 'Authorization',
            bearerFormat: 'Bearer', 
            scheme: 'Bearer',
            type: 'http',
            in: 'Header'
          },
          'access-token',
        )
        .build()

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('/docs', app, document); 

  await app.listen(8080);
}
bootstrap();
