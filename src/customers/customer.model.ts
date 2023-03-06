import { BaseModel } from '../common/base.model';
import { FundDeposit } from '../fund-deposits/fund-deposits.model';
import { Portfolio } from '../portfolios/portfolio.model';

export class Customer extends BaseModel {
  fundDeposits: FundDeposit[];
  portfolios: Portfolio[];
}
