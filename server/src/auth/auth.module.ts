import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { HashingService } from './hash/hashing.service';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [UserModule, MessageModule],
  controllers: [AuthController],
  providers: [AuthService, HashingService],
})
export class AuthModule {}
