import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const jwtConstants = {
  accessTokenSecret: configService.get<string>('ACCESS_TOKEN_SECRET'),
  refreshTokenSecret: configService.get<string>('REFRESH_TOKEN_SECRET'),
  accessTokenLife: configService.get<string>('ACCESS_TOKEN_LIFE'),
  refreshTokenLife: configService.get<string>('REFRESH_TOKEN_LIFE'),
};
