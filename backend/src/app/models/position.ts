import { DataTypes, Model, Sequelize } from 'sequelize';

export interface PositionAttributes {
  id?: string;
  latitude: number;
  longitude: number;
}

class Position extends Model {
  init() {}
}

export default Position;
