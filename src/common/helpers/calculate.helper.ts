import { BaseModel } from '../base.model';
import { PickByType } from './type.helper';
import Decimal from 'decimal.js';

export function calculateObjectArraySum<T extends BaseModel, K extends keyof PickByType<T, number>>(array: T[], key: K): Decimal {
  return array.reduce(
    (total: Decimal, object: T) => Decimal.add(new Decimal(total), new Decimal(object[key as keyof T] as number)),
    new Decimal(0)
  );
}
