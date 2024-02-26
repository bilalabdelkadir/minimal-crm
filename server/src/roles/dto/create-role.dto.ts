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

  @IsBoolean()
  manage: boolean;

  @IsBoolean()
  read: boolean;

  @IsBoolean()
  create: boolean;

  @IsBoolean()
  update: boolean;

  @IsBoolean()
  delete: boolean;

  @IsBoolean()
  export: boolean;

  @IsBoolean()
  import: boolean;

  @IsBoolean()
  print: boolean;

  @IsBoolean()
  approve: boolean;

  @IsBoolean()
  aprrove: boolean;

  @IsBoolean()
  reject: boolean;

  @IsBoolean()
  download: boolean;
}
