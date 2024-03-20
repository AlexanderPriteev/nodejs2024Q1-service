import { Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';
import { AppExceptionsFilter } from './exception.filter';

@Module({
  imports: [LoggerModule],
  providers: [AppExceptionsFilter],
  exports: [AppExceptionsFilter],
})
export class ExceptionModule {}
