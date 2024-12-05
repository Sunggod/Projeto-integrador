import PromptSync, * as promptSync from 'prompt-sync';
import { StoreService } from './service/index.service';
import { StoreDTO } from './dto';
import { UserCommum } from '../CommonUser/models';
import { Product } from '../Product/model/product';
import { Employees } from '../Employees/model';
import { Order } from '../Orders/models';
import { AdressClass } from './dto/model/adress-class-suport';
// Instanciando o prompt
const prompt = PromptSync();

 async function main () {
  const storeService = new StoreService();

  try {
    await storeService.init();

    console.log("Bem-vindo ao sistema de criação de lojas!");

    const name = prompt("Nome da loja: ");
    const ownerId = prompt("ID do proprietário da loja: ");

    const street = prompt("Rua: ");
    const city = prompt("Cidade: ");
    const state = prompt("Estado: ");
    const postalCode = prompt("Código Postal: ");
    const zip = prompt("CEP: ");
    
    const adress = new AdressClass();
    adress.street = street;
    adress.city = city;
    adress.state = state;
    adress.postalCode = postalCode;
    adress.zip = zip;

    const openingHours = prompt("Hora de abertura (ex: 08:00): ");
    const closingTime = prompt("Hora de fechamento (ex: 18:00): ");
    
    const openingDate = new Date(`1970-01-01T${openingHours}:00`);
    const closingDate = new Date(`1970-01-01T${closingTime}:00`);

    const imageBannerUrl = prompt("URL da imagem do banner: ");
    const imageLogoUrl = prompt("URL da imagem do logo: ");
    const employees: Employees[] = []; 
    const products: Product[] = []; 
    const orders: Order[] = []; 
    const userCommum: UserCommum[] = [];

    const storeDTO: StoreDTO = {
      name,
      adress: [adress],
      owner: ownerId,
      openingHours: openingDate,
      closingTime: closingDate,
      imageBannerUrl: imageBannerUrl || undefined,
      imageLogoUrl: imageLogoUrl || undefined,
      employees,
      products,
      orders,
      userCommum
    };

    const newStore = await storeService.createStore(storeDTO, ownerId);
    
    console.log(`Loja criada com sucesso: ${newStore.name}, com o dono ID ${newStore.owner}`);
  } catch (error: any) {
    console.error("Erro ao criar a loja:", error.message);
  }
}

main();
