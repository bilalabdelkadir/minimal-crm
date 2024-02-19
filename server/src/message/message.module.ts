import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GeezSmsProvider } from './providers/geez-message.provider';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Assuming you need ConfigModule for GEEZ_API_KEY
    HttpModule, // Assuming you need HttpModule for HttpService
  ],
  providers: [GeezSmsProvider, MessageService],
  exports: [
    GeezSmsProvider, // Exporting the provider makes it available for injection in other modules
  ],
  controllers: [MessageController],
})
export class MessageModule {}
