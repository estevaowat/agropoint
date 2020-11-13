import { Router } from 'express';
import PositionController from './app/controllers/PositionController';

const routes = Router();
const positionController = new PositionController();

routes.get('/paths', positionController.index);
routes.post('/positions', positionController.get);
routes.post('/', positionController.create);

export default routes;
