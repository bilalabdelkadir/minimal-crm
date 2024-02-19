import { Injectable, Logger } from '@nestjs/common';
import { GeezSmsProvider } from './providers/geez-message.provider';
import { TestMessageDto } from './dtos/send-test-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly geezSmsProvider: GeezSmsProvider) {}

  async testMessage({ message, phoneNumber }: TestMessageDto) {
    return this.geezSmsProvider.sendSMS(message, phoneNumber);
  }

  async sendOtpMessage({ message, phoneNumber }: TestMessageDto) {
    return this.geezSmsProvider.sendSMS(message, phoneNumber);
  }
}
