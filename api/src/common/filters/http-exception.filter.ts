import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'

/**
 * Global HTTP exception filter that returns RFC 7807 Problem Details responses.
 * https://www.rfc-editor.org/rfc/rfc7807
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()
    const request = ctx.getRequest<FastifyRequest>()

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : null

    const detail =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : ((exceptionResponse as Record<string, unknown>)?.message ??
          'An unexpected error occurred')

    const errors =
      typeof exceptionResponse === 'object' &&
      Array.isArray((exceptionResponse as Record<string, unknown>)?.message)
        ? (exceptionResponse as Record<string, unknown>).message
        : undefined

    if (status >= 500) {
      this.logger.error(exception)
    }

    response
      .status(status)
      .header('Content-Type', 'application/problem+json')
      .send({
        type: `https://linkbeet.in/errors/${status}`,
        title: HttpExceptionFilter.statusTitle(status),
        status,
        detail,
        instance: request.url,
        ...(errors ? { errors } : {}),
      })
  }

  private static statusTitle(status: number): string {
    const titles: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      429: 'Too Many Requests',
      500: 'Internal Server Error',
    }
    return titles[status] ?? 'Error'
  }
}
