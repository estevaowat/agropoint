import csv from 'csv-parser';
import { getManager } from 'typeorm';
import fetch   from 'node-fetch';
import Position from '../models/position';

interface Request {
  url: string;
}

class Services {
  entityManager = getManager();

  public async execute({ url }: Request) {
    const response = await fetch(url);
    const { body }  = response ;
    const positions: any[] = [];
    return new Promise((res, rej) => {
    body.pipe(csv({
      headers: ['latitude', 'longitude'],
      skipLines: 1,
      mapValues: (data) => {
        const { value } = data;
        return Number(value);
      }
    })).on('error', (error) => rej(error))
      .on('data', (data) => {
      positions.push({...data, path: url  });
    }).on('end', async () => {

      const positionsToSave = this.entityManager.create(Position, positions);

      await this.entityManager.save(positionsToSave);

       res(positions);
     });

    })


  }
}
export default Services;
