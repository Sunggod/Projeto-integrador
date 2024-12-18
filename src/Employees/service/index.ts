import { FileRepository } from '../../database/FileRepository';
import { IEmployeesService } from '../interface';
import { EmployeesData } from '../types';
import { Employees } from './../model/index';
import { EmployeeDto } from './../dto/index';

export class EmployeesService implements IEmployeesService{
    private fileRepo!: FileRepository;
    constructor(){}
    private async init():Promise <void>{
         this.fileRepo = await FileRepository.getInstance()
    }

    async getEmployees(): Promise<Employees[]> {
        return this.fileRepo.getEmployess();
    }

   async getEmployeeById(id: Employees['id']): Promise<Employees> {
    const index = this.fileRepo.getEmployess().findIndex(e => e.id === id);
    if(index !== -1){
        console.log(`Funcionario com ${id} encontrado com sucesso! Nome do funcionario: ${this.getEmployeeById.name}`)
        return this.fileRepo.getEmployess()[index]
       }
       else{
           throw new Error("Funcionario(a) não encontrado!")
       }
    }  
    async updateEmployee(Employe: Employees, storeId: string, bossId: string, updateEmployee: Partial<Employees>): Promise<Employees> {
        this.fileRepo.verifyOwnership(storeId,bossId)
        const index = this.fileRepo.getEmployess().findIndex(e => e.id === Employe.id)
        if(index !== -1){
            this.fileRepo.getEmployess()[index] = {...this.fileRepo.getEmployess()[index]
                , ...updateEmployee}
            this.fileRepo.saveChanges()
        }else{
            throw new Error("Funcionario(a) não encontrado!")
        }
        console.log(`Informações do funcionario ${Employe.name} atualizadas com sucesso!`)
        return this.fileRepo.getEmployess()[index]
    }
    async createEmployee(employeeDto: EmployeeDto, storeId: string, bossId: string): Promise<Employees> {
        console.log("Verificando ownership...");
        this.fileRepo.verifyOwnership(storeId, bossId);
        const stores = this.fileRepo.getStores();
        console.log('Lojas disponíveis:', stores);
        console.log('ID fornecido:', storeId);
        
        const store = stores.find(store => store.id.trim() === storeId.trim());
        if (!store) {
            throw new Error('Loja não encontrada!');
        }

            const employer :EmployeesData = {
                name: employeeDto.name!,
                email: employeeDto.email,
                password:employeeDto.password,
                age: employeeDto.age,
                role: employeeDto.role,
                storeId: employeeDto.storeId! = storeId,
                bossId: employeeDto.bossId! = bossId,
                imageUrl:employeeDto.imageUrl!,
                cpf:employeeDto.cpf!
            }
            console.log("Instanciando novo funcionário...");
            const newEmployee = new Employees(employer);
            store.employees = store.employees || [];
            store.employees.push(newEmployee);
            console.log("Adicionando funcionário ao repositório...");
            await this.fileRepo.addEmployee(newEmployee);
            this.fileRepo.saveChanges()
            console.log("Novo funcionário criado com sucesso:", newEmployee);
             return newEmployee;

    }


    async deleteEmployee(id: Employees['id'], storeId:string, bossId:string): Promise<void> {
        this.fileRepo.verifyOwnership(storeId,bossId)
        const index = this.fileRepo.getEmployess().findIndex(e => e.id === id);
        if(index !== -1){
            this.fileRepo.getEmployess().splice(index, 1);
            console.log(`Funcionario com ${id} deletado com sucesso!`)
            }else{
            throw new Error("funcionario(a) não encontrado!")
        }
    }
}


