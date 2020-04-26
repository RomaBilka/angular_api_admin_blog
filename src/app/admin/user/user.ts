export class User {
  public id: number;
  public name: string;
  public login: string;
  public paswword: string;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.login = data.login;
    this.paswword = data.paswword;
  }
}

