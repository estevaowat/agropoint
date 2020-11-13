import { } from 'dotenv/config';
import express from 'express';
import cors from 'cors'
import './app/databases';
import 'reflect-metadata';

import routes from './routes';

const app = express();
app.use(cors())
app.use(express.json());

app.use(routes);

app.listen(4000, () => {
  console.log('listen in port 4000');
});
