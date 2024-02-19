import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { HashingService } from './hash/hashing.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, HashingService],
})
export class AuthModule {}
