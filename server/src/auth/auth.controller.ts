import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { VeifiyEmailOrPhoneDto } from 'src/user/dto/otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Post('verify-otp')
  verifyOtp(@Body() data: VeifiyEmailOrPhoneDto) {
    return this.authService.verifyOtp(data);
  }
}
