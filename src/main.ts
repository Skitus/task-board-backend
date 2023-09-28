import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { createDocument } from './shared/swagger/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const clientUrl = configService.get<string>('CLIENT_URL');

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: clientUrl,
    credentials: true,
  });

  SwaggerModule.setup('api', app, createDocument(app));
  logger.verbose(`Application is listening on the port ${port}`);
  await app.listen(port || 8080);
}
bootstrap();
