export class Image {
  public id: number;
  public name: string;
  public order: number;
  public status: number;
  public filters?: Array<number>;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.order = data.order;
    this.status = data.status;
    this.filters = [];
    if (data.filters) {
      data.filters.forEach(filter => this.filters.push(filter.id));
    }
  }
}

