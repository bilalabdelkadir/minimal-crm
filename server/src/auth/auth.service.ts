import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
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
import { MailService } from 'src/mail/mail.service';
import { error } from 'console';
import { catchError } from 'rxjs';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly messageService: MessageService,
    private readonly jwtGeneratorService: JwtGeneratorService,
    private readonly mailService: MailService,
  ) {}

  async signup(data: SignupDto) {
    try {
      const existingUser = await this.userService.findUserByEmailAndPhone(
        data.email,
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

      // const smsOtpResponse = await this.sendOtpOverSms(data.phoneNumber);
      const emailOtpResponse = await this.sendOtpOverEmail(data.email);

      // if (smsOtpResponse.error) {
      //   this.logger.error(smsOtpResponse.error);
      //   throw new BadRequestException('Error Happend while sending the otp');
      // }
      // TODO: fix this letter
      let smsOtpResponse;

      if (!emailOtpResponse.otp || !emailOtpResponse.sentOver) {
        throw new BadRequestException('Error Happend while sending the otp');
      }

      const saveOtp = await this.userService.saveOtp({
        otp: emailOtpResponse.otp ? emailOtpResponse.otp : smsOtpResponse.otp,
        email: data.email,
        userId: user.id,
        sentOver: emailOtpResponse.sentOver
          ? emailOtpResponse.sentOver
          : smsOtpResponse.sentOver,
      });

      if (!saveOtp) {
        throw new BadRequestException('Error Happend while saving the otp');
      }

      return {
        message: 'User Created Successfully',
        user,
      };
    } catch (e) {
      this.logger.error(e);
      CustomErrorException.handle(e);
    }
  }

  async me(userId: string) {
    return this.userService.findUserById(userId);
  }

  async Signin(data: SigninDto) {
    try {
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

      const accessToken = await this.jwtGeneratorService.generateAccessToken({
        userId: user.id,
        email: user.email,
      });

      const refreshToken = await this.jwtGeneratorService.generateRefreshToken({
        userId: user.id,
        email: user.email,
      });

      delete user.password;

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (e) {
      console.log(e);
      CustomErrorException.handle(e);
    }
  }

  async verifyOtp(data: VeifiyEmailOrPhoneDto) {
    try {
      const otp = await this.userService.vefiyEmailOrPhone(data);
      if (!otp) {
        throw new ForbiddenException('Otp Verification Failed');
      } else if (otp.success) {
        const user = await this.userService.findUserById(data.userId);

        const accessToken = await this.jwtGeneratorService.generateAccessToken({
          email: user.email,
          userId: user.id,
        });
        const refreshToken =
          await this.jwtGeneratorService.generateRefreshToken({
            email: user.email,
            userId: user.id,
          });

        delete user.password;

        return {
          success: true,
          message: 'Otp Verified Successfully',
          user,
          accessToken,
          refreshToken,
        };
      }
    } catch (e) {
      this.logger.error(e);
      CustomErrorException.handle(e);
    }
  }

  private async sendOtpOverEmail(email: string) {
    const otp = otpGenerator(4);
    const message: string = `your otp for easypeasy-crm is ${otp}`;
    const response = await this.mailService.sendOtpMessage({
      email,
      message,
    });

    return {
      otp,
      sentOver: OtpSentTo.EMAIL,
    };
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
