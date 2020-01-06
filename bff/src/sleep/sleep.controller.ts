import { Controller, Post, Body } from '@nestjs/common';
import { SleepService } from './sleep.service';

@Controller('sleep')
export class SleepController {
    constructor(private sleepService: SleepService) {}

    @Post()
    async postSleep(@Body('time') time: number) {
      await this.sleepService.sleep(time)
      return { sleep: time };
    }
}
