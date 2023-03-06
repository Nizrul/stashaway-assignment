/* eslint-disable no-undef */

import { DepositPlan } from '../deposit-plans/deposit-plan.model';
import { simulateFundAllocation } from './portfolio.service';
import { DepositPlanType } from '../common/constants';
import { Portfolio } from './portfolio.model';
import { DepositPlanAllocation } from '../deposit-plan-allocations/deposit-plan-allocation.model';
import { FundDeposit } from '../fund-deposits/fund-deposits.model';

describe('PortfolioService', () => {
  describe('Testing the example flow', () => {
    it('should return 10000 and 600 respectively', () => {
      const depositPlans: DepositPlan[] = [
        {
          id: 1,
          type: DepositPlanType.ONE_TIME,
          allocations: [new DepositPlanAllocation(1, 1, 10000), new DepositPlanAllocation(2, 1, 500)]
        },
        {
          id: 2,
          type: DepositPlanType.MONTHLY,
          allocations: [new DepositPlanAllocation(1, 1, 0), new DepositPlanAllocation(2, 1, 100)]
        }
      ];

      const fundDeposits: FundDeposit[] = [new FundDeposit(1, 10500), new FundDeposit(1, 100)];

      const samplePortfolios = [
        ...new Set(depositPlans.flatMap((plan) => plan.allocations.map((allocation) => allocation.portfolioId)))
      ].map((portfolioId) => Portfolio.generate(portfolioId));

      const expectedResult: Portfolio[] = [
        {
          ...samplePortfolios[0],
          totalAllocatedAmount: 10000
        },
        {
          ...samplePortfolios[1],
          totalAllocatedAmount: 600
        }
      ];

      expect(simulateFundAllocation(depositPlans, fundDeposits)).toEqual(expectedResult);
    });
  });

  describe('Testing undervalue funds flow', () => {
    it('should return 5000 and 300 respectively', () => {
      const depositPlans: DepositPlan[] = [
        {
          id: 1,
          type: DepositPlanType.ONE_TIME,
          allocations: [new DepositPlanAllocation(1, 1, 10000), new DepositPlanAllocation(2, 1, 500)]
        },
        {
          id: 2,
          type: DepositPlanType.MONTHLY,
          allocations: [new DepositPlanAllocation(1, 1, 0), new DepositPlanAllocation(2, 1, 100)]
        }
      ];

      const fundDeposits: FundDeposit[] = [new FundDeposit(1, 5250), new FundDeposit(1, 50)];

      const samplePortfolios = [
        ...new Set(depositPlans.flatMap((plan) => plan.allocations.map((allocation) => allocation.portfolioId)))
      ].map((portfolioId) => Portfolio.generate(portfolioId));

      const expectedResult: Portfolio[] = [
        {
          ...samplePortfolios[0],
          totalAllocatedAmount: 5000
        },
        {
          ...samplePortfolios[1],
          totalAllocatedAmount: 300
        }
      ];

      expect(simulateFundAllocation(depositPlans, fundDeposits)).toEqual(expectedResult);
    });
  });

  describe('Testing overvalue funds flow', () => {
    it('should return 20000 and 1200 respectively', () => {
      const depositPlans: DepositPlan[] = [
        {
          id: 1,
          type: DepositPlanType.ONE_TIME,
          allocations: [new DepositPlanAllocation(1, 1, 10000), new DepositPlanAllocation(2, 1, 500)]
        },
        {
          id: 2,
          type: DepositPlanType.MONTHLY,
          allocations: [new DepositPlanAllocation(1, 1, 0), new DepositPlanAllocation(2, 1, 100)]
        }
      ];

      const fundDeposits: FundDeposit[] = [new FundDeposit(1, 21000), new FundDeposit(1, 200)];

      const samplePortfolios = [
        ...new Set(depositPlans.flatMap((plan) => plan.allocations.map((allocation) => allocation.portfolioId)))
      ].map((portfolioId) => Portfolio.generate(portfolioId));

      const expectedResult: Portfolio[] = [
        {
          ...samplePortfolios[0],
          totalAllocatedAmount: 20000
        },
        {
          ...samplePortfolios[1],
          totalAllocatedAmount: 1200
        }
      ];

      expect(simulateFundAllocation(depositPlans, fundDeposits)).toEqual(expectedResult);
    });
  });
});
