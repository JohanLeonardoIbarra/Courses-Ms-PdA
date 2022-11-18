import express from 'express';
import cors from 'cors';
import courseRouter from 'Router/Course';

export class Server {
  private app = express();
  private port: number;

  constructor() {
    this.port = 8080;
    this.app.use(express.json());
    this.app.use(cors({ origin: '*' }));
    this.routes();
  }

  public init(port?: number): void {
    if (port) this.port = port;

    this.listen();
  }

  private routes(): void {
    this.app.use('/course', courseRouter);
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log('Server listening on port: ' + this.port);
    });
  }
}
