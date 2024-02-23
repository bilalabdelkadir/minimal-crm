import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GeezSmsProvider } from './providers/geez-message.provider';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  providers: [GeezSmsProvider, MessageService],
  exports: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
