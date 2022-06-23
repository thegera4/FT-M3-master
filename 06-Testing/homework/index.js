const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.post('/sum', (req, res) => {
  const { a, b } = req.body;
  res.send({
    result: a + b,
  });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  const { array, num } = req.body;
  const result = array.reduce((acc, curr) => acc + curr, 0);
  res.send({
    result: result !== num,
  });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
