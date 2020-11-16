import 'dotenv/config';
import App from './app';

const { app: server } = App;

const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log(`listen in port ${port}`);
});
