import { Injectable, Logger } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { DatabaseService } from 'src/db/db.service';
import { CustomErrorException } from 'src/utils/errorHandler';
import { SourceType } from '@prisma/client';

@Injectable()
export class CompaniesService {
  private logger = new Logger(CompaniesService.name);
  constructor(private readonly db: DatabaseService) {}
  async create(data: CreateCompanyDto, workspaceId: string) {
    const { tags, preferredContactMethod, addresses, ...rest } = data;
    try {
      const company = await this.db.company.create({
        data: {
          ...rest,
          preferredContactMethod: preferredContactMethod,
          workspaceId,
          referalSource: {
            connectOrCreate: {
              where: {
                name_workspaceId: {
                  workspaceId: workspaceId,
                  name: data.referalSource,
                },
              },
              create: {
                name: data.referalSource,
                sourceType: SourceType.ReferalSource,
                workspaceId: workspaceId,
              },
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(error);
      CustomErrorException.handle(error);
    }
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
