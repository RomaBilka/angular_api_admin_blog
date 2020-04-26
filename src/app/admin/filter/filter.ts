export class Filter {
  public id: number;
  public name: string;
  public order: number;
  public status: number;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.order = data.order;
    this.status = data.status;
  }
}

