export class Image {
  public id: number;
  public name: string;
  public order: number;
  public status: number;
  public filters?: any;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.order = data.order;
    this.status = data.status;
    this.filters = data.filters;
  }
}

