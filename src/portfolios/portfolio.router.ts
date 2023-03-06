import express from 'express';
import { simulate } from './portfolio.controller';
import { validate } from '../common/middleware/validation.middleware';
import { simulatePortfolioAllocationSchema } from './portfolio.dto';

const portfolioRouter = express.Router();

portfolioRouter.post('/simulate', validate(simulatePortfolioAllocationSchema), simulate);

export default portfolioRouter;
