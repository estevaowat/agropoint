import { Request, Response } from 'express';
import Services from '../services';

export default class PositionController {
  public async create(request: Request, response: Response) {
    const services = new Services();
    const { url } = request.body;
    console.log(request.body)
    const positions = await services.execute({ url });

    return response.json({
      positions,
    });
  }
}
