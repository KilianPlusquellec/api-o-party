import cors from 'cors';
import express from 'express';
import router from './router/index.router.js';
import docMiddleware from './libraries/doc.middleware.js';

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
          'https://o-party.onrender.com/'
      ],
      credentials: true,
      exposedHeaders: ['Authorization'],
      methods: "GET,PATCH,POST,DELETE",
  })
);

docMiddleware(app);

app.use(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Une erreur s\'est produite' });
});

export default app;