import { EmployeeDto } from "../dto";
import { Employees } from "../model";

export interface IEmployeesService{
    getEmployees(): Promise<Employees[]>;
    getEmployeeById(id: Employees["id"]): Promise<Employees>;
    createEmployee(employeeDto:EmployeeDto,storeId:string, bossId:string):Promise<Employees>
    updateEmployee(Employe:Employees, storeId:string, bossId:string, updateEmployee:Partial<Employees>):Promise<Employees>
    deleteEmployee(id: Employees["id"]): Promise<void>;
}
