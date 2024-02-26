import { Module } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { FileUploadProvider } from './fileupload';

@Module({
  providers: [FileuploadService, FileUploadProvider],
  exports: [FileuploadService, FileUploadProvider],
})
export class FileuploadModule {}
