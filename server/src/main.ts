import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('bootstrap');

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
  });
  app.setGlobalPrefix('api/v1');

  const environment = configService.get('NODE_ENV');
  if (environment !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('AfricEscape - API')
      .setDescription('Backend API for AfricEscape.')
      .addBearerAuth()
      .addCookieAuth('refresh-token')
      .setVersion('v1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('explorer', app, document, {
      swaggerOptions: {
        docExpansion: 'none',
        plugins: [
          () => {
            return {
              wrapComponents: {
                curl: () => () => null,
              },
            };
          },
        ],
      },
    });
  }

  app.use((req: Request, res: Response, next: NextFunction) => {
    Logger.log(`${req.method} ${req.url}`);
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(8000).then(() => {
    logger.log(`Server running on port 8000`);
    logger.log(`swagger running on port http://localhost:8000/explorer`);
  });
}
bootstrap();
