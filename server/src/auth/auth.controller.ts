import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { VeifiyEmailOrPhoneDto } from 'src/user/dto/otp.dto';
import { SigninDto } from './dtos/signin.dto';
import AccessTokenGuard from './guards/AccessToken.guard';
import { UserId } from './decorator/userId.decorator';
import { Public } from './decorator/publicRoute.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signin(@Body() data: SigninDto) {
    return this.authService.Signin(data);
  }

  @Get('/me')
  me(@UserId() userId: string) {
    return this.authService.me(userId);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  verifyOtp(@Body() data: VeifiyEmailOrPhoneDto) {
    return this.authService.verifyOtp(data);
  }
}
