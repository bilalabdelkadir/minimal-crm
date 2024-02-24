import { ApiProperty } from '@nestjs/swagger';
import { OtpSentTo } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class OtpDto {
  @IsNumber()
  otp: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsString()
  userId: string;

  @IsOptional()
  @IsEnum(OtpSentTo)
  sentOver: OtpSentTo;
}

export class VeifiyEmailOrPhoneDto {
  @ApiProperty({
    example: '123456',
    description: 'The otp sent to the user',
    required: true,
  })
  @IsNumber()
  otp: string;

  @IsOptional()
  @IsEnum(OtpSentTo)
  sentOver: OtpSentTo;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the user',
    required: true,
  })
  @IsString()
  userId: string;
}
