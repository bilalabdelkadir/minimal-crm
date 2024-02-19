import { Injectable } from '@nestjs/common';
import { SignupDto } from 'src/auth/dtos/signup.dto';
import { databaseService } from 'src/db/db.service';

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
}
