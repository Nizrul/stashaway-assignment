export class BaseModel {
  id: number;
  createdDate?: Date;
  updatedDate?: Date;

  constructor() {
    this.id = 0;
    this.createdDate = new Date();
    this.updatedDate = new Date();
  }
}
