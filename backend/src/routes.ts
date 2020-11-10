import { Router } from 'express';
import PositionController from './app/controllers/PositionController';

const routes = Router();
const positionController = new PositionController();
routes.get('/', positionController.create);

export default routes;
