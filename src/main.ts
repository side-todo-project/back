import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger/dist';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiDocsConfig = new DocumentBuilder()
    .setTitle('Todo api docs')
    .setDescription('Todo api docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, apiDocsConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe()); // class-validator 적용
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
