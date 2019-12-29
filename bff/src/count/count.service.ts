import { Injectable } from '@nestjs/common';

@Injectable()
export class CountService {
    private counter = 0;

    countUp(): number {
        this.counter++;
        console.log('countUp', this.counter);
        if (this.counter % 3 === 0) {
            throw new Error("fool");
        }
        return this.counter;
    }
}
