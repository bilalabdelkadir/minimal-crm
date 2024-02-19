import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class CustomErrorException extends HttpException {
  constructor(message: string, statusCode: HttpStatus, property: string = '') {
    super(
      {
        message,
        property,
      },
      statusCode,
    );
  }

  static handle(error: Error, property?: string) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2025':
        case 'P2016':
          throw new CustomErrorException(
            'Not found',
            HttpStatus.NOT_FOUND,
            property,
          );
        case 'P2021':
          throw new CustomErrorException(
            'Database connection error',
            HttpStatus.INTERNAL_SERVER_ERROR,
            property,
          );
        case 'P2002':
          throw new CustomErrorException(
            'This record already exists',
            HttpStatus.CONFLICT,
            property,
          );
        default:
          throw new CustomErrorException(error.message, 400, property);
      }
    } else if (error instanceof CustomErrorException) {
      throw error;
    } else if (error instanceof HttpException) {
      const message = error.getResponse()['message'] || 'Something went wrong!';
      const statusCode = error.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new CustomErrorException(message, statusCode, property);
    } else {
      throw new CustomErrorException('Something went wrong!', 500, property);
    }
  }
}

@Catch(CustomErrorException)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<any>();
    let message = exception.getResponse()['message'];
    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message,
      property: exception.getResponse()['property'],
    });
  }
}
