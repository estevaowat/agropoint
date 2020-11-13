import csv from 'csv-parser';
import { getManager } from 'typeorm';
import fetch   from 'node-fetch';
import Position from '../models/position';

interface SaveRequest {
  url: string;
}

class Services {
  private entityManager = getManager();

  public async findAllCsvImported() {
    const paths = await this.entityManager.createQueryBuilder(Position, 'positions')
      .select('path')
      .distinct(true)
      .getRawMany();

    return paths;

  }

  public async findPositionsByUrl(url: string) {
    console.log('url', url)
    const positions = await this.entityManager.find(Position, {
      path: url
    })

    console.log(positions);
    return positions;
  }

  public async saveCsvIntoDatabase({ url }: SaveRequest) {
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

       res(positionsToSave);
     });

    })


  }
}
export default Services;
