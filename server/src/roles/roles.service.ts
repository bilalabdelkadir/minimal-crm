import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/create-role.dto';
import { PermissionActions } from '@prisma/client';
import { CustomErrorException } from 'src/utils/errorHandler';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);
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

    const findRole = await this.db.role.findFirst({
      where: {
        roleName: data.roleName,
        workspaceId,
      },
    });

    if (findRole) {
      throw new ConflictException(
        `Role with name ${data.roleName} already exists`,
      );
    }

    const hasManagePermission = data.permissions.some((permission) =>
      permission.permissions.includes(PermissionActions.MANAGE),
    );

    const permissionsData = data.permissions.map((permission) => ({
      moduleName: permission.moduleName,
      actions: permission.permissions.includes(PermissionActions.MANAGE)
        ? Object.values(PermissionActions)
        : permission.permissions,
      workspaceId: workspaceId,
    }));

    this.logger.log(permissionsData);

    const role = await this.db.role.create({
      data: {
        roleName: data.roleName,
        description: data.description,
        workspaceId,
        permissions: {
          createMany: {
            data: permissionsData,
            skipDuplicates: true,
          },
        },
      },
      include: {
        permissions: true,
      },
    });

    return role;
  }

  async updateRole(
    data: UpdateRoleDto,
    workspaceId: string,
    userId: string,
    roleId: string,
  ) {
    try {
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

      this.logger.log('we found the user ....');

      const workspace = user.ownedWorkspaces.find(
        (workspace) => workspace.id === workspaceId,
      );

      if (!workspace) {
        throw new ForbiddenException('you are not allowed to create roles');
      }

      this.logger.log('we found the workspace ....');

      const permissionsData = data.permissions.map((permission) => ({
        moduleName: permission.moduleName,
        actions: permission.permissions.includes(PermissionActions.MANAGE)
          ? Object.values(PermissionActions)
          : permission.permissions,
        workspaceId: workspaceId,
      }));

      this.logger.log(permissionsData);

      const role = await this.db.role.update({
        where: {
          id: roleId,
          workspaceId,
        },
        data: {
          roleName: data.roleName,
          description: data.description,
          permissions: {
            update: permissionsData.map((permission) => ({
              where: {
                moduleName_roleId: {
                  moduleName: permission.moduleName,
                  roleId,
                },
              },
              data: {
                actions: permission.actions,
              },
            })),
          },
        },
      });

      return role;
    } catch (error) {
      this.logger.error(error);
      CustomErrorException.handle(error);
    }
  }

  async findRoles(workspaceId: string) {
    return this.db.role.findMany({
      where: {
        workspaceId,
      },
      include: {
        permissions: true,
      },
    });
  }

  async findRoleByName(workspaceId: string, roleName: string) {
    try {
      const role = this.db.role.findFirst({
        where: {
          roleName,
          workspaceId,
        },
        include: {
          permissions: true,
        },
      });
      if (!role) {
        throw new NotFoundException('there is no role with this name');
      }

      return role;
    } catch (error) {
      this.logger.log(error);
      CustomErrorException.handle(error);
    }
  }

  async deleteRole(workspaceId: string, roleId: string) {
    try {
      const role = await this.db.role.findFirst({
        where: {
          id: roleId,
          workspaceId,
        },
      });

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      return this.db.role.delete({
        where: {
          id: roleId,
          workspaceId,
        },
      });
    } catch (error) {
      this.logger.log(error);
      CustomErrorException.handle(error);
    }
  }
}
