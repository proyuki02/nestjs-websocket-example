import { Controller, Get } from '@nestjs/common';
import { SleepService } from './sleep.service';

@Controller('sleep')
export class SleepController {
    constructor(private sleepService: SleepService) {}

    @Get()
    async getSleep() {
      await this.sleepService.sleep(10000)
      return { sleep: 10000 };
    }
}
