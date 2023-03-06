import { FundDeposit } from '../fund-deposits/fund-deposits.model';
import { DepositPlan } from '../deposit-plans/deposit-plan.model';
import * as joi from 'joi';
import { DepositPlanType } from '../common/constants';

export interface SimulatePortfolioAllocationDto {
  depositPlans: DepositPlan[];
  fundDeposits: FundDeposit[];
}

export const simulatePortfolioAllocationSchema: joi.ObjectSchema = joi.object({
  depositPlans: joi
    .array()
    .items(
      joi.object({
        type: joi
          .string()
          .valid(...Object.values(DepositPlanType))
          .required(),
        allocations: joi
          .array()
          .items(
            joi.object({
              portfolioId: joi.number().required(),
              amount: joi.number().required()
            })
          )
          // ensure that there are no repeat allocations for the same portfolio
          .unique('portfolioId')
          .min(1)
      })
    )
    .required()
    // ensure that there is only one instance of a type of deposit plan
    .unique('type')
    .min(1),
  fundDeposits: joi
    .array()
    .items(
      joi.object({
        customerId: joi.number().required(),
        amount: joi.number().required().min(1)
      })
    )
    .min(1)
    .required()
});
