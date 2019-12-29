import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { UseFilters } from '@nestjs/common';
import { SleepService } from './sleep.service';
import { WebsocketExceptionFilter } from '../filters/websocket-exception.filter';

@WebSocketGateway({ namespace: 'sleep', transports: ['websocket'] })
export class SleepGateway {
  constructor(private sleepService: SleepService) { }

  @SubscribeMessage('getSleep')
  @UseFilters(new WebsocketExceptionFilter('getSleep'))
  async getSleep(client: any, payload: any) {
    await this.sleepService.sleep(10000)
    return { sleep: 10000 };
  }
}
