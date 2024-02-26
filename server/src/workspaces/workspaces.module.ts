import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { FileuploadModule } from 'src/fileupload/fileupload.module';

@Module({
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
  imports: [FileuploadModule],
})
export class WorkspacesModule {}
