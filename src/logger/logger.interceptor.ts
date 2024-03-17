import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppLogger } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { url, body, params } = context.getArgByIndex(0);
    const { statusCode } = context.getArgByIndex(1);
    const objLog = { url, body, queryParameters: params, statusCode };

    this.logger.log(JSON.stringify(objLog));

    return next.handle();
  }
}
