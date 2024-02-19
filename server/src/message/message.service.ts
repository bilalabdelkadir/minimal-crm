import { Injectable, Logger } from '@nestjs/common';
import { GeezSmsProvider } from './providers/geez-message.provider';
import { TestMessageDto } from './dtos/send-test-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly geezSmsProvider: GeezSmsProvider) {}

  async testMessage({ message, phone_number }: TestMessageDto) {
    return this.geezSmsProvider.sendSMS(message, phone_number);
  }

  async sendOtpMessage({ message, phone_number }: TestMessageDto) {
    return this.geezSmsProvider.sendSMS(message, phone_number);
  }
}
