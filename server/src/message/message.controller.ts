import { Body, Controller, HttpException, Logger, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { TestMessageDto } from './dtos/send-test-message.dto';
import axios from 'axios';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('test-message')
  testMessage(@Body() data: TestMessageDto) {
    const { message, phoneNumber } = data;

    if (!message || !phoneNumber) {
      throw new HttpException('Invalid request', 400);
    }

    Logger.log(`Sending message to ${phoneNumber}`);
    return this.messageService.testMessage(data);
  }
}
