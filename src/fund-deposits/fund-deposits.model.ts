import { Customer } from '../customers/customer.model';
import { BaseModel } from '../common/base.model';

export class FundDeposit extends BaseModel {
  customerId: number;
  amount: number;

  customer?: Customer;

  constructor(customerId: number, amount: number) {
    super();
    this.customerId = customerId;
    this.amount = amount;
  }
}
