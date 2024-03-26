import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AppLogger } from '../logger/logger.service';

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: AppLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      message = exception.message;
    }

    const responseBody = {
      statusCode: httpStatus,
      message: message,
    };
    const objLog = {
      ...responseBody,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      body: ctx.getRequest().body,
    };

    this.logger.error(JSON.stringify(objLog));

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
