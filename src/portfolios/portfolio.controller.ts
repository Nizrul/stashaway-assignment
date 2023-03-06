import { Request, Response } from 'express';
import { simulateFundAllocation } from './portfolio.service';
import { SimulatePortfolioAllocationDto } from './portfolio.dto';

export const simulate = async (req: Request<{}, {}, SimulatePortfolioAllocationDto>, res: Response) => {
  const allocatedPortfolios = simulateFundAllocation(req.body.depositPlans, req.body.fundDeposits);
  res.status(200).json(allocatedPortfolios);
};
