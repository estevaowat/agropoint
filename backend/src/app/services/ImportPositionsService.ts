import csvParser from 'csv-parser';
import path from 'path';
import fs from 'fs';

import { getManager } from 'typeorm';
import Position from '../models/position';

interface IPosition {
  latitude: number;
  longitude: number;
}

class ImportPositionsService {
  public async execute() {
    const entityManager = getManager(); // you can also get it via getConnection().manager

    const samplePath = path.join(__dirname, 'sample.csv');
    const positions: IPosition[] = [];

    fs.createReadStream(samplePath)
      .pipe(
        csvParser({
          headers: ['latitude', 'longitude'],
          separator: ',',
        })
      )
      .on('data', (data: IPosition) => {
        const { latitude, longitude } = data;

        positions.push({
          latitude: Number(latitude),
          longitude: Number(longitude),
        });
      })
      .on('end', () => {
        const positionsSaved = entityManager.create(Position, positions);

        //   entityManager.save(positionsSaved);
      });
  }
}
export default ImportPositionsService;
