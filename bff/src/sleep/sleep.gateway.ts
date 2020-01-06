import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { UseFilters } from '@nestjs/common';
import { SleepService } from './sleep.service';
import { WebsocketExceptionFilter } from '../filters/websocket-exception.filter';

@WebSocketGateway({ namespace: 'sleep', transports: ['websocket'] })
export class SleepGateway {
  constructor(private sleepService: SleepService) { }

  @SubscribeMessage('postSleep')
  @UseFilters(new WebsocketExceptionFilter('postSleep'))
  async postSleep(client: any, payload: any) {
    await this.sleepService.sleep(payload.time)
    return { sleep: payload.time };
  }
}
