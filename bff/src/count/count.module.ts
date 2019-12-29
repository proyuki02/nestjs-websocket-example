import { Module } from '@nestjs/common';
import { CountService } from './count.service';
import { CountController } from './count.controller';
import { CountGateway } from './count.gateway';

@Module({
  providers: [CountService, CountGateway],
  controllers: [CountController]
})
export class CountModule {}
