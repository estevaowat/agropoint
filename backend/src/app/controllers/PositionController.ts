import { Request, Response } from 'express';

export default class PositionController {
  public async create(request: Request, response: Response) {
    return response.json({ ok: true });
  }
}
