import { PartialType } from '@nestjs/swagger';
import { PermissionActions } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

enum ModuleName {
  LEADS = 'leads',
  SALES = 'sales',
  CUSTOMERS = 'customers',
  PRODUCTS = 'products',
  SETTINGS = 'settings',
  REPORTS = 'reports',
  DASHBOARD = 'dashboard',
  INVENTORY = 'inventory',
  PURCHASE = 'purchase',
  EXPENSES = 'expenses',
  ACCOUNTS = 'accounts',
  PAYROLL = 'payroll',
  USER = 'user',
  ROLE = 'role',
}

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  roleName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsArray()
  @Type(() => PermissionDto)
  @ValidateNested({ each: true })
  permissions: PermissionDto[];
}

export class PermissionDto {
  @IsNotEmpty()
  @IsString()
  moduleName: ModuleName;

  @IsArray()
  @IsString({ each: true })
  permissions: PermissionActions[];
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
