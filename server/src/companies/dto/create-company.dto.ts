import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  ValidateNested,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsArray,
} from 'class-validator';
import { PreferredContactMethod } from '@prisma/client';
import { Transform, Type } from 'class-transformer';

export class BaseComanyContactDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: "Name can't be empty",
  })
  name: string;

  @ApiProperty()
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email address',
    },
  )
  email: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => String(value))
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  secondaryEmail?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => String(value))
  @IsString()
  secondaryPhone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  website?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PreferredContactMethod)
  preferredContactMethod?: PreferredContactMethod;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  referalSource: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  preferredCurrency: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  preferredLanguage: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  contacts: string[];
}

export class CreateCompanyDto extends BaseComanyContactDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class AddressDto {
  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zip?: string;
}
