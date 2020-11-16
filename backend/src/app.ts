import express from 'express';
import cors from 'cors';
import Connection from './app/databases';
import 'reflect-metadata';
import routes from './routes';

class App {
  public app = express();

  constructor() {
    this.init();
  }

  private init() {
    this.databases();
    this.middlewares();
  }

  private databases() {
    Connection.create();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(routes);
  }
}

export default new App();
