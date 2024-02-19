import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TestMessageDto {
  @ApiProperty({
    example: 'Hello, this is a test message from condigtal.',
  })
  @IsString()
  message: string;

  @ApiProperty({
    example: '0943656931',
  })
  @IsString()
  phone_number: string;
}
