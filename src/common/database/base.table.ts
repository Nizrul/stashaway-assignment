/* eslint-disable no-unused-vars */
import _ from 'lodash';
import { BaseModel } from '../base.model';

export abstract class BaseTable<T extends BaseModel> {
  abstract list: T[];

  fetchById(id: number): T | undefined {
    return this.list.find((item) => item.id === id);
  }

  fetchAll(): T[] {
    return this.list;
  }

  insert(item: Partial<T>): void {
    // While not the best way to handle this, we'll just instantiate a new model using BaseModel, since we can't instantiate a new T
    const newItem = new BaseModel();

    this.list.push(_.merge(newItem, item) as T);
  }

  update(id: number, item: T): void {
    const existingItemIndex = this.list.findIndex((existingItem) => existingItem.id);
    if (existingItemIndex === -1) {
      throw new Error('Item for update does not exist');
    }

    this.list[existingItemIndex] = item;
  }

  patch(item: Partial<T>): void {
    const existingItemIndex = this.list.findIndex((existingItem) => existingItem.id);
    if (existingItemIndex === -1) {
      throw new Error('Item for update does not exist');
    }

    // merge will replace whatever common fields that already exist from left to right
    this.list[existingItemIndex] = _.merge(this.list[existingItemIndex], item);
  }
}
