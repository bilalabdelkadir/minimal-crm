import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Public } from 'src/auth/decorator/publicRoute.decorator';
import { WORKSPACEID } from 'src/utils/header.constant';
import { UserId } from 'src/auth/decorator/userId.decorator';
import { CreateRoleDto, UpdateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(
    @Body() createRoleDto: CreateRoleDto,
    @Headers(WORKSPACEID) workspaceId: string,
    @UserId() userId: string,
  ) {
    return this.rolesService.createRole(createRoleDto, workspaceId, userId);
  }

  @Patch(':id')
  async updateRole(
    @Body() updateRoleDto: UpdateRoleDto,
    @Headers(WORKSPACEID) workspaceId: string,
    @UserId() userId: string,
    @Param('id') roleId: string,
  ) {
    return this.rolesService.updateRole(
      updateRoleDto,
      workspaceId,
      userId,
      roleId,
    );
  }

  @Get()
  async getRoles(@Headers(WORKSPACEID) workspaceId: string) {
    return this.rolesService.findRoles(workspaceId);
  }

  @Get(':roleName')
  async getRole(
    @Headers(WORKSPACEID) workspaceId: string,
    @Param('roleName') roleName: string,
  ) {
    return this.rolesService.findRoleByName(workspaceId, roleName);
  }

  @Delete(':id')
  async deleteRole(
    @Headers(WORKSPACEID) workspaceId: string,
    @Param('id') roleId: string,
  ) {
    return this.rolesService.deleteRole(workspaceId, roleId);
  }
}
