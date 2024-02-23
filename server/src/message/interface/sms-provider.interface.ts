export const SMSProviderName = {
  GEEZ: 'GEEZ',
  HAHU: 'HAHU',
  CONSOLE: 'CONSOLE',
  AFRO: 'AFRO MESSAGE',
} as const;

export type SMSProviderName =
  (typeof SMSProviderName)[keyof typeof SMSProviderName];

export interface ISMSProvider {
  sendSMS(message: string, phone_number: string): Promise<unknown>;
}

export const SMS_PROVIDER_TOKEN = 'SMS_PROVIDER';
