import { MiddlewareConsumer, Module, NestMiddleware } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import * as Joi from 'joi';
import { HttpExceptionFilter } from './utils/exceptionsLogger.filter';
import { DatabaseModule } from './db/db.module';
import { LoggingMiddleware } from './utils/loggingMiddleware';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        EMAIL_USERNAME: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_PORT: Joi.string().required(),
        GEEZ_API_KEY: Joi.string().required(),
        ACCESS_TOKEN_SECRET: Joi.string().min(5).required(),
        REFRESH_TOKEN_SECRET: Joi.string().min(5).required(),
        ACCESS_TOKEN_LIFE: Joi.string().required(),
        REFRESH_TOKEN_LIFE: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    JwtModule.register({
      global: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    MessageModule,
    MailModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error('Method not implemented.');
  }
  configre(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
