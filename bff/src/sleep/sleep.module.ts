import { Module } from '@nestjs/common';
import { SleepService } from './sleep.service';
import { SleepController } from './sleep.controller';
import { SleepGateway } from './sleep.gateway';

@Module({
  providers: [SleepService, SleepGateway],
  controllers: [SleepController]
})
export class SleepModule {}
