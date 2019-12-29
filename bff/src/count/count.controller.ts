import { Controller, Get } from '@nestjs/common';
import { CountService } from './count.service';

@Controller('count')
export class CountController {
    constructor(private countService: CountService) {}

    @Get()
    getCount() {
        return { count: this.countService.countUp() };
    }
}
