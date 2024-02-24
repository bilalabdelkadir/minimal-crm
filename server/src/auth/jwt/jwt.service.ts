import { Injectable } from '@nestjs/common';
import { configConstant } from 'src/config/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGeneratorService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: { userId: string; email: string }) {
    return this.jwtService.sign(payload, {
      secret: configConstant.accessTokenSecret,
      expiresIn: configConstant.accessTokenLife,
    });
  }

  async generateRefreshToken(payload: { userId: string; email: string }) {
    return this.jwtService.sign(payload, {
      secret: configConstant.refreshTokenSecret,
      expiresIn: configConstant.refreshTokenLife,
    });
  }
}
