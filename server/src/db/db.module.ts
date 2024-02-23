import { Global, Module } from '@nestjs/common';
import { databaseService } from './db.service';

@Global()
@Module({
  providers: [databaseService],
  exports: [databaseService],
})
export class DatabaseModule {}
