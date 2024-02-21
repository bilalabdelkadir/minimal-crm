import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { VeifiyEmailOrPhoneDto } from 'src/user/dto/otp.dto';
import { SigninDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signin(@Body() data: SigninDto) {
    return this.authService.Signin(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  verifyOtp(@Body() data: VeifiyEmailOrPhoneDto) {
    return this.authService.verifyOtp(data);
  }
}
