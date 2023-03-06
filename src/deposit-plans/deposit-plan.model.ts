import { BaseModel } from '../common/base.model';
import { DepositPlanType } from '../common/constants';
import { DepositPlanAllocation } from '../deposit-plan-allocations/deposit-plan-allocation.model';
import { Portfolio } from '../portfolios/portfolio.model';

export class DepositPlan extends BaseModel {
  type: DepositPlanType;
  last_allocation_date?: Date;

  portfolios?: Portfolio[];
  allocations: DepositPlanAllocation[];
}
