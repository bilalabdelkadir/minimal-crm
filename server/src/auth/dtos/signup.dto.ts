import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
    required: true,
  })
  @MinLength(2, {
    message: 'First name must be at least 3 characters long',
  })
  @MaxLength(30, {
    message: 'First name must be at most 30 characters long',
  })
  @IsString({
    message: 'First name must be a valid string',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
    required: true,
  })
  @MinLength(2, {
    message: 'Last name must be at least 3 characters long',
  })
  @MaxLength(30, {
    message: 'Last name must be at most 30 characters long',
  })
  @IsString({
    message: 'Last name must be a valid string',
  })
  lastName: string;

  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'The email of the user',
    required: true,
  })
  @IsEmail(
    {},
    {
      message: 'Email must be a valid email address',
    },
  )
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    required: true,
  })
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message:
        'Password must be at least 6 characters long and contain at least 1 lowercase letter and 1 number',
    },
  )
  password: string;
}
