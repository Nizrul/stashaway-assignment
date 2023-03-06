import express from 'express';
import portfolioRouter from './portfolios/portfolio.router';
import { pino } from 'pino';

require('dotenv').config({ path: __dirname + '/../.env' });

const logger = pino({
  name: 'main'
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_, res) => {
  res.send("It's up");
});

app.use('/portfolios', portfolioRouter);

app.listen(port, () => {
  logger.info(`The application is listening on ${port} test`);
});
