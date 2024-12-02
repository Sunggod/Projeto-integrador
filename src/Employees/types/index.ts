import { Store } from "../../Store/model";
import { User } from "../../User/model";
export type Role =
  | "manager"
  | "stockAnalyst"
  | "logisticsManager"
  | "salesManager"
  | "dataAnalyst";

export type EmployeesData = {
  name: string;
  age: number;
  email: string;
  password: string;
  bossId:User["id"]
  storeId: Store["id"];
  role: Role;
  imageUrl?: string;
  cpf?: string;
  id?:string
  createdAt?:Date
  updatedAt?:Date
};
