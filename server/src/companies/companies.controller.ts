import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Headers,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { WORKSPACEID } from 'src/utils/header.constant';
import { QueryDto } from 'src/shared/dtos/query.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Headers(WORKSPACEID) workspaceId: string,
  ) {
    return await this.companiesService.create(createCompanyDto, workspaceId);
  }

  @Get()
  async findAll(
    @Query() query: QueryDto,
    @Headers(WORKSPACEID) workspaceId: string,
  ) {
    return await this.companiesService.findAll(query, workspaceId);
  }

  @Get('/referal-source')
  async getReferalSource(@Headers(WORKSPACEID) workspaceId: string) {
    return await this.companiesService.getReferalSource(workspaceId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
