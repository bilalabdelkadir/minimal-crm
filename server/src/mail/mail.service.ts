import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}
  async sendOtpMessage({ email, message }: { email: string; message: string }) {
    this.logger.log(`sending email to ${email}`);
    this.logger.log(`${message}`);
    await this.mailerService.sendMail({
      to: email,
      from: `info@easy-crm.com`,
      subject: `Confirm your easy crm account.`,
      html: `
            <div>
              <h1>Hello,</h1>
              <p>Email confirmation for easy crm.</p>
              <p>${message}</p>
            </div>
            `,
    });
  }
}
