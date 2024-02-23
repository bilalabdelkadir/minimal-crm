import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { HashingService } from './hash/hashing.service';
import { MessageModule } from 'src/message/message.module';
import { JwtGeneratorService } from './jwt/jwt.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [UserModule, MessageModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService, HashingService, JwtGeneratorService],
})
export class AuthModule {}
