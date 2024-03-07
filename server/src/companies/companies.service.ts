import { Injectable, Logger } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { DatabaseService } from 'src/db/db.service';
import { CustomErrorException } from 'src/utils/errorHandler';
import { Prisma, Source, SourceType } from '@prisma/client';
import { QueryDto } from 'src/shared/dtos/query.dto';

@Injectable()
export class CompaniesService {
  private logger = new Logger(CompaniesService.name);
  constructor(private readonly db: DatabaseService) {}
  async create(data: CreateCompanyDto, workspaceId: string) {
    const { tags, preferredContactMethod, contacts, addresses, ...restData } =
      data;

    try {
      const company = await this.db.company.create({
        data: {
          ...restData,
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: { name_workspaceId: { name: tag, workspaceId } },
              create: { name: tag, workspaceId },
            })),
          },
          addresses: {
            createMany: {
              data: addresses.map((address) => ({
                ...address,
                workspaceId,
              })),
              skipDuplicates: true,
            },
          },
          preferredContactMethod: preferredContactMethod,
          workspaceId,

          referalSource:
            data.referalSource && data.referalSource !== ''
              ? {
                  connectOrCreate: {
                    where: {
                      name_workspaceId: {
                        workspaceId: workspaceId,
                        name: data.referalSource,
                      },
                    },
                    create: {
                      name: data.referalSource,
                      sourceType: data.referalSource
                        ? SourceType.ReferalSource
                        : null,
                      workspaceId: workspaceId,
                    },
                  },
                }
              : undefined,
        },
      });

      return company;
    } catch (error) {
      this.logger.error(error);
      CustomErrorException.handle(error);
    }
  }

  async findAll(query: QueryDto, workspaceId: string) {
    try {
      const { filter, page = 1, search, size = 20 } = query;
      const skip = (page - 1) * size;
      const take = size;
      const where: Prisma.CompanyWhereInput = {
        workspaceId,
      };

      if (filter) {
        where.tags = {
          some: {
            name: {
              contains: filter,
              mode: 'insensitive',
            },
          },
        };
      }

      if (search) {
        where.OR = [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            phone: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ];
      }

      const totalCount = await this.db.company.count({ where });
      const totalPages = Math.ceil(totalCount / size);

      const companies = await this.db.company.findMany({
        where,
        orderBy: {
          updatedAt: 'desc',
        },
        skip,
        take,
        include: {
          tags: true,
          referalSource: true,
        },
      });

      return {
        data: companies,
        meta: {
          page,
          size,
          total: totalCount,
          totalPages,
        },
      };
    } catch (error) {
      this.logger.error(error);
      CustomErrorException.handle(error);
    }
  }

  findOne(id: number) {
    return `This action returns is this the one company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }

  async getReferalSource(workspaceId: string): Promise<
    {
      name: string;
    }[]
  > {
    try {
      return await this.db.source.findMany({
        where: {
          workspaceId,
          sourceType: 'ReferalSource',
        },
        select: {
          name: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      CustomErrorException.handle(error);
    }
  }
}
