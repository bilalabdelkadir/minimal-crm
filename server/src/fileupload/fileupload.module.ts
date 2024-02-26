import { Module } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { Fileupload } from './fileupload';

@Module({
  providers: [FileuploadService, Fileupload],
  exports: [FileuploadService, Fileupload],
})
export class FileuploadModule {}
