import { Transform } from 'class-transformer';
import { IsOptional, IsInt, IsPositive, IsString } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsPositive()
  page?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsPositive()
  size?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  filter?: string;
}
