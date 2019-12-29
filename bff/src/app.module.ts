import { Module } from '@nestjs/common';
import { CountModule } from './count/count.module';
import { SleepModule } from './sleep/sleep.module';

@Module({
  imports: [CountModule, SleepModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
