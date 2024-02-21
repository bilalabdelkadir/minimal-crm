import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SignupDto } from 'src/auth/dtos/signup.dto';
import { databaseService } from 'src/db/db.service';
import { OtpDto, VeifiyEmailOrPhoneDto } from './dto/otp.dto';

@Injectable()
export class UserService {
  constructor(private readonly db: databaseService) {}

  async createUser(data: SignupDto) {
    const user = await this.db.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      },
    });

    delete user.password;
    return user;
  }

  async getUserById(id: string) {
    return await this.db.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByEmailAndPhone(email: string, phone: string) {
    console.log(email, phone);
    return await this.db.user.findMany({
      where: {
        OR: [{ email }, { phoneNumber: phone }],
      },
    });
  }

  async saveOtp(data: OtpDto) {
    const expireAt = new Date();
    expireAt.setMinutes(expireAt.getMinutes() + 30);

    return await this.db.otp.create({
      data: {
        phoneNumber: data.phoneNumber,
        otp: parseInt(data.otp),
        email: data.email,
        userId: data.userId,
        sentOver: data.sentOver,
        expiredAt: expireAt,
      },
    });
  }

  async getOtpByUserId(userId: string) {
    return await this.db.otp.findFirst({
      where: {
        userId,
      },
    });
  }

  // TODO: add email verification
  async vefiyEmailOrPhone(data: VeifiyEmailOrPhoneDto) {
    const otp = await this.db.otp.findFirst({
      where: {
        otp: parseInt(data.otp),
        userId: data.userId,
      },
    });

    if (!otp) {
      throw new NotFoundException('this otp is not valid, ask for a new one');
    }
    if (otp.expiredAt < new Date()) {
      throw new BadRequestException('this otp is expired, ask for a new one');
    }
    if (otp.sentOver === 'PHONE') {
      const user = await this.db.user.update({
        where: {
          id: data.userId,
        },
        data: {
          isPhoneVerified: true,
        },
      });

      if (!user) {
        throw new BadRequestException('Error Happend while updating the user');
      }

      const updatedOtp = await this.db.otp.delete({
        where: {
          id: otp.id,
        },
      });

      if (!updatedOtp) {
        throw new BadRequestException('Error Happend while updating the otp');
      }

      return {
        success: true,
        message: 'Phone Verified Successfully',
      };
    }

    if (otp.sentOver === 'EMAIL') {
      const user = await this.db.user.update({
        where: {
          id: data.userId,
        },
        data: {
          isEmailVerified: true,
        },
      });

      if (!user) {
        throw new BadRequestException('Error Happend while updating the user');
      }

      const updatedOtp = await this.db.otp.delete({
        where: {
          id: otp.id,
        },
      });

      if (!updatedOtp) {
        throw new BadRequestException('Error Happend while updating the otp');
      }

      return {
        success: true,
        message: 'Email Verified Successfully',
      };
    }
  }
}
