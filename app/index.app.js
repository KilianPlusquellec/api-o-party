import cors from 'cors';
import express from 'express';
import router from './router/index.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  cors({
      origin: [
          'http://localhost',
          'http://localhost:5173',
          'http://127.0.0.1:5173',
          'http://localhost:5174',
          'http://127.0.0.1:5174',
      ],
      credentials: true,
      methods: "GET,PATCH,POST,DELETE",
  })
);

app.use(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Une erreur s\'est produite' });
});

export default app;