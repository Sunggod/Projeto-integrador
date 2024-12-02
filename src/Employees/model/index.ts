import { BaseEntry } from "../../base";
import { Store } from "../../Store/model";
import { User } from "../../User/model";
import { Role, EmployeesData } from "../types";
export class Employees extends BaseEntry {
  name!: string;
  age!: number;
  email!: string;
  password!: string;
  bossId!: User["id"]
  storeId!: Store["id"];
  role!: Role;
  imageUrl?: string;
  cpf?: string;

  constructor(data: EmployeesData) {
    super(data.id, data.createdAt, data.updatedAt);
    this.name = data.name;
    this.age = data.age;
    this.email = data.email;
    this.password = data.password;
    this.storeId = data.storeId;
    this.bossId = data.bossId
    this.role = data.role;
    this.imageUrl = data.imageUrl;
    this.cpf = data.cpf;
  }

  validate?(): boolean {
    return Boolean(this.name && this.email && this.password);
  }
}
