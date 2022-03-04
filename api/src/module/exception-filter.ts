import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let msg;
    let error;

    try {
      if (
        (exception as HttpException).getResponse &&
        (exception as HttpException).getResponse()
      ) {
        msg =
          (exception as HttpException).getResponse()["message"] ||
          (exception as HttpException).getResponse();
      }
    } catch (e) {
      console.error(e);
      error = e;
    }

    const logs = {
      type: "error-api",
      status: status,
      url: `${request.method} ${request.url}`,
      body: request.body,
      message: exception.toString(),
    };

    console.error(logs);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: msg,
    });
  }
}
