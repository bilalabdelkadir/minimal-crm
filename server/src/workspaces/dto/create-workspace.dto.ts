import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty({
    example: 'My workspace',
    description: 'The name of the workspace',
  })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'This is my workspace',
    description: 'The description of the workspace',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://myworkspace.com',
    description: 'The website of the workspace',
  })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({
    example: 'USA',
    description: 'The country of the workspace',
  })
  @IsOptional()
  @IsString()
  country?: string;
}
