import csv from 'csv-parser';
import { EntityManager, getManager } from 'typeorm';
import fetch from 'node-fetch';
import Position from '../models/position';

interface SaveRequest {
  url: string;
}

class Services {
  private entityManager: EntityManager;

  constructor(connnectionName: string = 'default') {
    this.entityManager = getManager(connnectionName);
  }

  public async findAllCsvImported() {
    const paths = await this.entityManager
      .createQueryBuilder(Position, 'positions')
      .select('path')
      .distinct(true)
      .getRawMany();

    return paths;
  }

  public async findPositionsByUrl(url: string) {
    const positions = await this.entityManager.find(Position, {
      path: url,
    });

    return positions;
  }

  public async downloadCsvFromUrl(url: string) {
    const { body } = await fetch(url);
    return body;
  }

  public async saveCsvIntoDatabase({
    url,
  }: SaveRequest): Promise<Position[] | null> {
    const positions: any[] = [];
    const body = await this.downloadCsvFromUrl(url);

    if (!body) return null;

    return new Promise((res, rej) => {
      body
        .pipe(
          csv({
            headers: ['latitude', 'longitude'],
            skipLines: 1,
            mapValues: (data) => {
              const { value } = data;
              return Number(value);
            },
          })
        )
        .on('error', (error) => rej(error))
        .on('data', (data) => {
          positions.push({ ...data, path: url });
        })
        .on('end', async () => {
          const positionsToSave = this.entityManager.create(
            Position,
            positions
          );

          await this.entityManager.save(positionsToSave);

          res(positionsToSave);
        });
    });
  }
}
export default Services;
