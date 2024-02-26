import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Public } from 'src/auth/decorator/publicRoute.decorator';
import { WORKSPACEID } from 'src/utils/header.constant';
import { UserId } from 'src/auth/decorator/userId.decorator';
import { CreateRoleDto } from './dto/create-role.dto';

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

  @Get(':roleName')
  async getRole(
    @Headers(WORKSPACEID) workspaceId: string,
    @Param('roleName') roleName: string,
  ) {
    return this.rolesService.findRoleByName(workspaceId, roleName);
  }
}
