import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { configConstant } from 'src/config/constants';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: configConstant.mailHost,
        port: configConstant.mailPort,
        auth: {
          user: configConstant.mailEmailUsername,
          pass: configConstant.mailPassword,
        },
      },
      defaults: {
        from: configConstant.appName,
      },
      template: {
        dir: process.cwd() + '/src/mail/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
