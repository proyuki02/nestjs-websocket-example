import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { UseFilters } from '@nestjs/common';
import { CountService } from './count.service';
import { WebsocketExceptionFilter } from '../filters/websocket-exception.filter';

@WebSocketGateway({ namespace: 'count', transports: ['websocket'] })
export class CountGateway {
  constructor(private countService: CountService) { }

  @SubscribeMessage('getCount')
  @UseFilters(new WebsocketExceptionFilter('getCount'))
  getCount(client: any, payload: any) {
    return { count: this.countService.countUp() };
  }
}
