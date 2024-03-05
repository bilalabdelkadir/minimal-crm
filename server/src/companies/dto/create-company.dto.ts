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
import { Type } from 'class-transformer';

export class BaseComanyContactDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  secondaryEmail?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
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
  @ValidateNested({ each: true })
  @Type(() => String)
  tags: string[];
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

  @IsOptional()
  @IsString()
  country?: string;
}
