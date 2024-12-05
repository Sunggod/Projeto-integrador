import { User } from '../User/model'
import { Store } from '../Store/model'
import { Product } from '../Product/model/product'
import { Promotion } from '../Promotion/model'
import { Employees } from '../Employees/model'
import { promises as fs } from 'fs';
import { Order } from '../Orders/models'
import { UserCommum } from '../CommonUser/models'
import path from 'path'

export class FileRepository {
    private static instance: FileRepository;
    private filePath: string = path.resolve(__dirname, '../config/data/database.json');

    private data: {
        users: User[];
        stores: Store[];
        products: Product[];
        promotions: Promotion[];
        employees: Employees[];
        orders: Order[];
        usersCommumn:UserCommum[]
    } = { users: [], stores: [], products: [], promotions: [], employees: [], orders: [], usersCommumn:[]};

    private constructor() {}

    public async init(): Promise<void> {
        await this.ensureDatabaseFile();
        this.data = await this.loadDataFromFile();
    }

    public static async getInstance(): Promise<FileRepository> {
        if (!FileRepository.instance) {
            FileRepository.instance = new FileRepository();
            await FileRepository.instance.init();
        }
        return FileRepository.instance;
    }
    
    private async ensureDatabaseFile(): Promise<void> {
        const defaultData = { users: [], stores: [], products: [], promotions: [], employees: [] };

        try {
            await fs.access(this.filePath);
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                console.warn(`Arquivo "${this.filePath}" não encontrado. Criando um novo...`);
                await fs.writeFile(this.filePath, JSON.stringify(defaultData, null, 2));
            } else {
                throw new Error(`Erro ao verificar ou criar o arquivo: ${error.message}`);
            }
        }
    }

    private async loadDataFromFile(): Promise<any> {
        try {
            const fileContent = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error: any) {
            throw new Error(`Erro ao carregar o arquivo: ${error.message}`);
        }
    }

    private async saveDataToFile(): Promise<void> {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
        } catch (error: any) {
            throw new Error(`Erro ao salvar o arquivo: ${error.message}`);
        }
    }
    public getUsersComumm(storeId:string): UserCommum[] {//+
        return this.data.usersCommumn.filter(user => user.storeId === storeId);
    }
    public getUsersComummById(id: string, storeId:string): UserCommum | undefined {
        return this.data.usersCommumn.find(user => user.id === id && user.storeId === storeId)
    };
    public async addUserComumm(user: UserCommum): Promise<void>{
        this.data.usersCommumn.push(user);
        await this.saveDataToFile();
    }
    public getOrder(): Order[]{
        return this.data.orders
    }

    public async addOrder(orders: Order): Promise<void>{
        this.data.orders.push(orders);
        await this.saveDataToFile();
    }


    public getUsers(): User[] {
        return this.data.users;
    }

    public async addUser(user: User): Promise<void> {
        this.data.users.push(user);
        await this.saveDataToFile();
    }

    public getEmployess():Employees[]{
        return this.data.employees;
    }
    public async addEmployee(employee: Employees): Promise<void> {
        this.data.employees.push(employee);
        await this.saveDataToFile();
    }
    public getStores(): Store[] {
        return this.data.stores;
    }

    public async addStore(store: Store): Promise<void> {
        this.data.stores.push(store);
        await this.saveDataToFile();
    }

    public getProducts(): Product[] {
        return this.data.products;
    }
    public async saveChanges(): Promise<void> {
        await this.saveDataToFile();
    }
    
    public async addProduct(product: Product): Promise<void> {
        this.data.products.push(product);
        await this.saveDataToFile();
    }

    public getPromotions(): Promotion[] {
        return this.data.promotions;
    }

    public async addPromotion(promotion: Promotion): Promise<void> {
        this.data.promotions.push(promotion);
        await this.saveDataToFile();
    }
}
