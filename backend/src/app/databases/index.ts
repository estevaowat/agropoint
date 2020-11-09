import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.config';
import Position from '../models/position';

const models = [Position];

class Database {
  connection: Sequelize;

  constructor() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
