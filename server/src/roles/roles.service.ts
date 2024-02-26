import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Permission } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private readonly db: DatabaseService) {}

  async createRole(data: CreateRoleDto, workspaceId: string, userId: string) {
    const user = await this.db.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        ownedWorkspaces: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const workspace = user.ownedWorkspaces.find(
      (workspace) => workspace.id === workspaceId,
    );

    if (!workspace) {
      throw new ForbiddenException('you are not allowed to create roles');
    }

    const permissionsData = data.permissions.map((permission) => ({
      moduleName: permission.moduleName,
      read: permission.manage || permission.read,
      create: permission.manage || permission.create,
      update: permission.manage || permission.update,
      delete: permission.manage || permission.delete,
      export: permission.manage || permission.export,
      import: permission.manage || permission.import,
      print: permission.manage || permission.print,
      approve: permission.manage || permission.approve,
      reject: permission.manage || permission.reject,
      download: permission.manage || permission.download,
      manage: permission.manage,

      workspaceId,
    }));

    const role = await this.db.role.create({
      data: {
        roleName: data.roleName,
        description: data.description,
        workspaceId,
        permissions: {
          createMany: {
            data: permissionsData,
          },
        },
      },
    });

    return role;
  }

  async findRoleByName(workspaceId: string, roleName: string) {
    return this.db.role.findFirst({
      where: {
        roleName,
        workspaceId,
      },
      include: {
        permissions: true,
      },
    });
  }
}
