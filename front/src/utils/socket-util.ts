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
    const opts = { timeout: 5000, ...options };

    return new Promise((resolve, reject) => {
      const { timeout, event, message } = opts;
      const exceptionEvent = `${event}Exception`;

      const timer = setTimeout(() => {
        this.socket.removeListener(exceptionEvent);
        reject(new Error(`timeout of ${timeout}ms exceeded for ${event}`));
      }, timeout);;

      this.socket.emit(event, message, (data: any) => {
        clearTimeout(timer);
        resolve(data);
      });
      this.socket.once(exceptionEvent, (data: any) => {
        clearTimeout(timer);
        reject(data);
      });
    });
  }
}
