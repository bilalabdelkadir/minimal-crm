import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { CustomErrorException } from 'src/utils/errorHandler';
import { UserId } from 'src/auth/decorator/userId.decorator';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  async createWorkspace(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @UserId() userId: string,
    @UploadedFile() logo?: Express.Multer.File,
  ) {
    return await this.workspacesService.createWorkspace(
      createWorkspaceDto,
      logo,
      userId,
    );
  }

  @Get()
  async getWorkspaces(@UserId() userId: string) {
    return await this.workspacesService.findAllWorkspaces(userId);
  }
  @Get(':id')
  async getWorkspace(@Param('id') id: string) {
    return await this.workspacesService.findWorkspaceById(id);
  }

  @Post('logo/:id')
  @UseInterceptors(FileInterceptor('logo'))
  async changeWorkspaceLogo(
    @UploadedFile() logo: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return await this.workspacesService.changeWorkspaceLogo(logo, id);
  }
}
