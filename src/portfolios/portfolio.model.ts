import { BaseModel } from '../common/base.model';
import { Customer } from '../customers/customer.model';
import { DepositPlanAllocation } from '../deposit-plan-allocations/deposit-plan-allocation.model';
import { DepositPlan } from '../deposit-plans/deposit-plan.model';

export class Portfolio extends BaseModel {
  customerId: number;
  name: string;
  totalAllocatedAmount: number;

  customer: Customer;
  depositPlans: DepositPlan[];
  allocations: DepositPlanAllocation[];

  constructor(id: number, customerId: number, name: string) {
    super();
    this.id = id;
    this.customerId = customerId;
    this.name = name;
    this.totalAllocatedAmount = 0;
  }

  static generate(id: number) {
    return new Portfolio(id, 1, `Portfolio ${id}`);
  }
}
