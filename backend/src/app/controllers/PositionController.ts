import { Request, Response } from 'express';
import Services from '../services';

export default class PositionController {
  public async index(request: Request, response: Response) {
    const services = new Services();

    const paths = await services.findAllCsvImported();

    return response.json(paths)
  }

  public async get(request: Request, response: Response) {
    const services = new Services();
         const { url } = request.body;
    const positions = await services.findPositionsByUrl(url);

    return response.json({
      positions
    })

  }

  public async create(request: Request, response: Response) {
    const services = new Services();
    const { url } = request.body;


    const positions = await services.saveCsvIntoDatabase({ url });

    return response.json({
      positions,
    });
  }
}
