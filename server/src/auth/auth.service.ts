import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { databaseService } from 'src/db/db.service';
import { SignupDto } from './dtos/signup.dto';
import { UserService } from 'src/user/user.service';
import { HashingService } from './hash/hashing.service';
import { CustomErrorException } from 'src/utils/errorHandler';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: databaseService,
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
  ) {}

  async signup(data: SignupDto) {
    try {
      const existingUser = await this.userService.getUserByEmailAndPhone(
        data.email,
        data.phoneNumber,
      );

      Logger.log(existingUser);

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

      return {
        message: 'User Created Successfully',
        data: user,
      };
    } catch (e) {
      CustomErrorException.handle(e);
    }
  }
}
