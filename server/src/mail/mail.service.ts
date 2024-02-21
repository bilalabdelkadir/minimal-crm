import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { configConstant } from 'src/config/constants';

@Injectable()
export class MailService {
  logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}
  async sendOtpMessage({ email, message }: { email: string; message: string }) {
    this.logger.log(`sending email to ${email}`);
    this.logger.log(`${message}`);
    await this.mailerService.sendMail({
      to: email,
      from: `info@${configConstant.appName}.com`,
      subject: `Confirm your ${configConstant.appName} account.`,
      html: `
            <div>
              <h1>Hello,</h1>
              <p>You have been invited to join ${configConstant.appName} on Africa Escape</p>
              <p>${message}</p>
            </div>
            `,
    });
  }
}
