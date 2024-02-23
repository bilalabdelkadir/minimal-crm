import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const configConstant = {
  accessTokenSecret: configService.get<string>('ACCESS_TOKEN_SECRET'),
  refreshTokenSecret: configService.get<string>('REFRESH_TOKEN_SECRET'),
  accessTokenLife: configService.get<string>('ACCESS_TOKEN_LIFE'),
  refreshTokenLife: configService.get<string>('REFRESH_TOKEN_LIFE'),
  geezApiKey: configService.get<string>('GEEZ_API_KEY'),
  mailHost: configService.get<string>('MAIL_HOST'),
  mailPort: configService.get<number>('MAIL_PORT'),
  mailEmailUsername: configService.get<string>('EMAIL_USERNAME'),
  mailPassword: configService.get<string>('EMAIL_PASSWORD'),
  nodeEnv: configService.get<'production | development | staging'>('NODE_ENV'),
  appName: configService.get<string>('APP_NAME'),
};
