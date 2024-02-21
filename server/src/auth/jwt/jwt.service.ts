import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constant/jwt.constant';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGeneratorService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: jwtConstants.accessTokenSecret,
      expiresIn: jwtConstants.accessTokenLife,
    });
  }

  async generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: jwtConstants.refreshTokenSecret,
      expiresIn: jwtConstants.refreshTokenLife,
    });
  }
}
