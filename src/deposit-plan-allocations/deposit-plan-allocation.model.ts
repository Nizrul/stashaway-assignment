import { Portfolio } from '../portfolios/portfolio.model';
import { BaseModel } from '../common/base.model';
import { DepositPlan } from '../deposit-plans/deposit-plan.model';

export class DepositPlanAllocation extends BaseModel {
  portfolioId: number;
  depositPlanId?: number;
  amount: number;

  portfolio?: Portfolio;
  depositPlan?: DepositPlan;

  constructor(portfolioId: number, depositPlanId: number, amount: number) {
    super();
    this.portfolioId = portfolioId;
    this.depositPlanId = depositPlanId;
    this.amount = amount;
  }
}
