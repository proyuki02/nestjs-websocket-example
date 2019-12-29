import io from "socket.io-client";

interface IRequestOptions {
  event: string;
  message?: any;
  timeout?: number;
}

export class SocketUtil {
  private socket: SocketIOClient.Socket;
  constructor(namespace: string) {
    this.socket = io(`ws://localhost:3001/${namespace}`, { transports: ['websocket'] });
  }

  request(options: IRequestOptions): any {
    const opts = {timeout: 3000, ...options};

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.socket.removeListener(opts.event);
        reject(new Error(`Timeout waiting for event(${opts.event})`));
      }, opts.timeout);;

      this.socket.emit(opts.event, opts.message, (data: any) => {
        clearTimeout(timer);
        resolve(data);
      });
      this.socket.once(`${opts.event}Exception`, (data: any) => {
        clearTimeout(timer);
        reject(data);
      });
    });
  }
}
