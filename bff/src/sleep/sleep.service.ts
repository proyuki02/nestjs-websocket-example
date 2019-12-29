import { Injectable } from '@nestjs/common';
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

@Injectable()
export class SleepService {
    async sleep(msec: number):Promise<void> {
        await sleep(msec);
    }
}
