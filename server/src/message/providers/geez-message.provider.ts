import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import { GEEZMSG_URL, GEEZ_SHORT_CODE } from '../constant/constant';
import { IGeezSMSResponse } from '../interface/geezmessage.interface';
import {
  ISMSProvider,
  SMSProviderName,
  SMS_PROVIDER_TOKEN,
} from '../interface/sms-provider.interface';
import {
  formatPhoneNumber,
  promisifyObservable,
} from '../interface/provider-utils.helper';

@Injectable()
export class GeezSmsProvider implements ISMSProvider {
  private readonly baseUrl;
  private apiKey: string;
  private backupProvider: ISMSProvider | null;
  private logger = new Logger(`${SMS_PROVIDER_TOKEN}_${SMSProviderName.GEEZ}`);

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiKey = this.configService.get('GEEZ_API_KEY');
    this.baseUrl = GEEZMSG_URL;
    // TODO: add backup provider
    this.backupProvider = null;
  }

  async sendSMS(message: string, phone_number: string) {
    this.logger.log(`before formatting: ${phone_number}`);
    const formattedNumber = formatPhoneNumber(phone_number);
    this.logger.log(`Sending message to ${formattedNumber}`);

    const buildurl = `${this.baseUrl}?token=${this.apiKey}&phone=${formattedNumber}&msg=${message}&shortcode_id=${GEEZ_SHORT_CODE}`;

    const config: AxiosRequestConfig = {
      url: buildurl,
      method: 'GET',
    };

    Logger.log(`final config: ${JSON.stringify(config)}`);

    try {
      const { data } = await promisifyObservable(
        this.httpService.get<IGeezSMSResponse>(buildurl),
      );
      if (data.error) {
        throw new Error(JSON.stringify(data.msg));
      }
      if (typeof data.msg === 'string') {
        this.logger.log(`${data.msg}_TO: ${formattedNumber}`);
      }
      if (this.configService.getOrThrow('NODE_ENV') !== 'production') {
        this.logger.log(`SMS_Message: ${message}`);
      }
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response !== undefined) {
          this.logger.error((error.response.data as IGeezSMSResponse).msg);
        } else {
          this.logger.error(error.message);
        }
      } else {
        this.logger.error(error);
      }
      if (this.backupProvider) {
        this.logger.error(
          'GEEZ failed to send message, using another service instead',
        );
        await this.backupProvider.sendSMS(message, phone_number);
      } else {
        this.logger.error('No backup SMS service.');
        throw error;
      }
    }
  }
}
