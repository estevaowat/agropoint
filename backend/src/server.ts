import 'dotenv/config';
import express from 'express';
import './app/databases';

import routes from './routes';

const app = express();

app.use(routes);

app.listen(3000, () => {
  console.log('listen in port 3000');
});
