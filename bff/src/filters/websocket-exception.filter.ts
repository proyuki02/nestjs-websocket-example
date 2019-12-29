import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch()
export class WebsocketExceptionFilter<T> implements BaseWsExceptionFilter {
  private exceptionEventName = 'exception';
  constructor(event: string) {
    this.exceptionEventName = `${event}Exception`;
  }

  handleError<IClient extends { emit: Function; }>(client: IClient, exception: any) {
    const message = {
      status: exception.status,
      name: exception.name,
      message: exception.message,
    };
    client.emit(this.exceptionEventName, message);
  }

  catch(exception: T, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    this.handleError(client, exception);
  }
}
