import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { CustomErrorException } from 'src/utils/errorHandler';
import { FileuploadService } from 'src/fileupload/fileupload.service';

@Injectable()
export class WorkspacesService {
  private readonly logger = new Logger(WorkspacesService.name);
  constructor(
    private readonly db: DatabaseService,
    private readonly fileUploadService: FileuploadService,
  ) {}

  async createWorkspace(
    createWorkspaceDto: CreateWorkspaceDto,
    logo: Express.Multer.File,
    userId: string,
  ) {
    try {
      const workspace = await this.db.workspace.create({
        data: {
          name: createWorkspaceDto.name,
          description: createWorkspaceDto.description,
          website: createWorkspaceDto.website,
          country: createWorkspaceDto.country,
          createdById: userId,
          ownedById: userId,
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });

      if (logo) {
        const logoUrl = await this.fileUploadService.uploadImage(logo);
        await this.db.workspace.update({
          where: {
            id: workspace.id,
          },
          data: {
            logo: {
              create: {
                publicId: logoUrl.public_id,
                url: logoUrl.secure_url,
              },
            },
          },
        });
      }

      const workspaceWithLogo = await this.db.workspace.findUnique({
        where: {
          id: workspace.id,
        },
        include: {
          logo: true,
          users: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      return workspaceWithLogo;
    } catch (e) {
      this.logger.error(e);
      CustomErrorException.handle(e);
    }
  }

  async findAllWorkspaces() {
    try {
      const workspaces = await this.db.workspace.findMany({
        include: {
          logo: true,
          ownedBy: true,
          createdBy: true,
          users: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      return workspaces;
    } catch (e) {
      this.logger.error(e);
      CustomErrorException.handle(e);
    }
  }

  async findWorkspaceById(id: string) {
    try {
      const workspace = await this.db.workspace.findUnique({
        where: {
          id,
        },
        include: {
          logo: true,
          ownedBy: true,
          createdBy: true,

          users: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      if (!workspace) {
        throw new NotFoundException('Workspace not found');
      }

      return workspace;
    } catch (e) {
      this.logger.error(e);
      CustomErrorException.handle(e);
    }
  }

  async changeWorkspaceLogo(logo: Express.Multer.File, id: string) {
    try {
      const workspace = await this.db.workspace.findUnique({
        where: {
          id,
        },
        include: {
          logo: true,
        },
      });

      if (!workspace) {
        throw new NotFoundException('Workspace not found');
      }

      if (workspace.logo) {
        await this.fileUploadService.deleteImage(workspace.logo.publicId);
      }

      const logoUrl = await this.fileUploadService.uploadImage(logo);

      const updatedLogo = await this.db.workspace.update({
        where: {
          id,
        },
        data: {
          logo: {
            create: {
              publicId: logoUrl.public_id,
              url: logoUrl.secure_url,
            },
          },
        },
      });

      return {
        message: 'Logo updated successfully',
      };
    } catch (e) {
      this.logger.error(e);
      CustomErrorException.handle(e);
    }
  }
}
