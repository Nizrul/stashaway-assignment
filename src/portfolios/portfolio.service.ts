import { DepositPlan } from '../deposit-plans/deposit-plan.model';
import { FundDeposit } from '../fund-deposits/fund-deposits.model';
import { Portfolio } from './portfolio.model';
import { calculateObjectArraySum } from '../common/helpers/calculate.helper';
import { DepositPlanAllocation } from '../deposit-plan-allocations/deposit-plan-allocation.model';
import Decimal from 'decimal.js';
import * as pino from 'pino';

const logger = pino.pino({
  name: 'PortfolioService'
});

export function simulateFundAllocation(depositPlans: DepositPlan[], fundDeposits: FundDeposit[]): Portfolio[] {
  try {
    const allocations: DepositPlanAllocation[] = depositPlans.flatMap((plan) => plan.allocations);
    // In actuality, we might be updating/retrieving portfolios that already exist for the customer
    // But for simulation, we'll use a generated list of Portfolios, and limit it to the ones included in the depositPlans
    const portfolios: Portfolio[] = [...new Set(allocations.map((allocation) => allocation.portfolioId))].map((portfolioId) =>
      Portfolio.generate(portfolioId)
    );

    // First step is to calculate the ratio, we'll do that by getting the total deposit plan allocation amount for reference
    const totalDepositPlanAmount = calculateObjectArraySum(allocations, 'amount');

    const totalFundDepositAmount = calculateObjectArraySum(fundDeposits, 'amount');

    // Then allocate all the extra funds equally
    allocations.forEach((allocation) => {
      portfolios[portfolios.findIndex((portfolio) => portfolio.id === allocation.portfolioId)].totalAllocatedAmount = Decimal.add(
        new Decimal(portfolios[portfolios.findIndex((portfolio) => portfolio.id === allocation.portfolioId)].totalAllocatedAmount),
        Decimal.mul(Decimal.div(new Decimal(allocation.amount), totalDepositPlanAmount), totalFundDepositAmount)
      ).toNumber();
    });

    // Arbitrarily round the portfolio amount
    portfolios.forEach((portfolio) => {
      const roundedAmount = new Decimal(portfolio.totalAllocatedAmount);
      portfolio.totalAllocatedAmount = roundedAmount.mul(100).round().dividedBy(100).toNumber();
      logger.info(portfolio.totalAllocatedAmount, 'Rounded to');
    });

    const postRoundingAmount = calculateObjectArraySum(portfolios, 'totalAllocatedAmount');
    const roundedDifference = Decimal.sub(totalFundDepositAmount, calculateObjectArraySum(portfolios, 'totalAllocatedAmount'));

    logger.info(
      {
        actualAmount: totalFundDepositAmount,
        roundedAmount: postRoundingAmount
      },
      'Checking post rounding amount'
    );

    // Arbitrarily assign the amount rounded away to the first portfolio
    portfolios[0].totalAllocatedAmount = Decimal.add(portfolios[0].totalAllocatedAmount, roundedDifference).toNumber();

    return portfolios;
  } catch (ex: unknown) {
    logger.error(
      {
        depositPlans,
        fundDeposits,
        error: (ex as Error).message
      },
      'Failed while simulating fund allocation'
    );
  }
}
