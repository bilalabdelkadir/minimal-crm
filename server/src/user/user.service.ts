import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignupDto } from 'src/auth/dtos/signup.dto';
import { DatabaseService } from 'src/db/db.service';
import { OtpDto, VeifiyEmailOrPhoneDto } from './dto/otp.dto';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async createUser(data: SignupDto) {
    const user = await this.db.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
    });

    delete user.password;
    return user;
  }

  async findUserById(id: string) {
    return await this.db.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findUserByEmailAndPhone(email?: string, phone?: string) {
    if (!email && phone) {
      return await this.db.user.findUnique({
        where: {
          phoneNumber: phone,
        },
      });
    } else if (email && !phone) {
      return await this.db.user.findUnique({
        where: {
          email,
        },
      });
    }
  }

  async saveOtp(data: OtpDto) {
    const expireAt = new Date();
    expireAt.setMinutes(expireAt.getMinutes() + 30);

    return await this.db.otp.create({
      data: {
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

  async deleteOtpByUserId(userId: string) {
    return await this.db.otp.deleteMany({
      where: {
        userId,
      },
    });
  }
}
