import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

interface NestErrorResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: unknown = 'Internal server error';
    let errorType = 'InternalServerError';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'object' && res !== null) {
        const errorObj = res as NestErrorResponse;
        message = errorObj.message ?? res;
        errorType = errorObj.error ?? exception.name;
      } else {
        message = res;
        errorType = exception.name;
      }
    } else if (exception instanceof Error) {
      // Unhandled runtime errors (e.g. database errors, syntax crashes)
      console.error('🔥 Unhandled Exception:', exception);
      message = 'An unexpected error occurred';
    }

    response.status(status).json({
      success: false,
      error: {
        statusCode: status,
        message,
        error: errorType,
      },
      timestamp: new Date().toISOString(),
    });
  }
}
