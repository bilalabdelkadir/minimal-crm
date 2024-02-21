import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { UserService } from 'src/user/user.service';
import { HashingService } from './hash/hashing.service';
import { CustomErrorException } from 'src/utils/errorHandler';
import { MessageService } from 'src/message/message.service';
import { otpGenerator } from 'src/utils/otp-generator';
import { OtpSentTo } from '@prisma/client';
import { VeifiyEmailOrPhoneDto } from 'src/user/dto/otp.dto';
import { JwtGeneratorService } from './jwt/jwt.service';
import { SigninDto } from './dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly messageService: MessageService,
    private readonly jwtGeneratorService: JwtGeneratorService,
  ) {}

  async signup(data: SignupDto) {
    try {
      const existingUser = await this.userService.findUserByEmailAndPhone(
        data.email,
        data.phoneNumber,
      );

      if (existingUser) {
        throw new ConflictException(
          'it looks like you already have an account, please login',
        );
      }

      const hashedPassword = await this.hashingService.hash(data.password);
      if (!hashedPassword) {
        throw new BadRequestException(
          'Error Happend while saving the password',
        );
      }

      const user = await this.userService.createUser({
        ...data,
        password: hashedPassword,
      });

      if (!user) {
        throw new BadRequestException('Error Happend while creating the user');
      }

      const otpResponse = await this.sendOtpOverSms(data.phoneNumber);

      if (otpResponse.error) {
        Logger.error(otpResponse.error);
        throw new BadRequestException('Error Happend while sending the otp');
      }

      const saveOtp = await this.userService.saveOtp({
        phoneNumber: data.phoneNumber,
        otp: otpResponse.otp,
        email: data.email,
        userId: user.id,
        sentOver: otpResponse.sentOver,
      });

      if (!saveOtp) {
        throw new BadRequestException('Error Happend while saving the otp');
      }

      return {
        message: 'User Created Successfully',
        data: user,
      };
    } catch (e) {
      CustomErrorException.handle(e);
    }
  }

  async Signin(data: SigninDto) {
    const user = await this.userService.findUserByEmailAndPhone(data.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await this.hashingService.compareHash(
      data.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('wrong password');
    }

    const accessToken = this.jwtGeneratorService.generateAccessToken(user);
    const refreshToken = this.jwtGeneratorService.generateRefreshToken(user);

    return {
      user: {
        ...user,
        password: undefined,
      },
      accessToken,
      refreshToken,
    };
  }

  async verifyOtp(data: VeifiyEmailOrPhoneDto) {
    const otp = await this.userService.vefiyEmailOrPhone(data);
    if (!otp) {
      throw new BadRequestException('Error Happend while verifying the otp');
    } else if (otp.success) {
      return {
        fakeJwt: 'fakeJwt',
        fakeRefreshToken: 'fakeRefreshToken',
      };
    }
  }

  private async sendOtpOverSms(phoneNumber: string) {
    const otp = otpGenerator(4);
    const message = `Your OTP for Condigital finance account is ${otp}, this will be expired in 30 minutes`;
    const response = await this.messageService.sendOtpMessage({
      message,
      phoneNumber,
    });

    return {
      error: response.error,
      otp,
      sentOver: OtpSentTo.PHONE,
    };
  }
}
