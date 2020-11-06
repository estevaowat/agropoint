import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({
    ok: false,
    message: 'hello world',
  });
});

app.listen(3000, () => {
  console.log('listen in port 3000');
});
