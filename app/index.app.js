import express from 'express';
import router from './router/index.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Une erreur s\'est produite' });
});

export default app;