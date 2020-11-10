import { Request, Response } from 'express';
import ImportPositionsService from '../services/ImportPositionsService';

export default class PositionController {
  public async create(request: Request, response: Response) {
    const importPositionsService = new ImportPositionsService();

    const positions = await importPositionsService.execute();

    return response.json({
      positions,
    });
  }
}
