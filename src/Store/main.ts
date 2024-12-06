import PromptSync, * as promptSync from 'prompt-sync'; // Importa o módulo de captura de entradas do usuário de forma síncrona
import { StoreService } from './service/index.service'; // Importa o serviço responsável pela lógica de criação de lojas
import { StoreDTO } from './dto'; // Importa o DTO (Data Transfer Object) para representar os dados de uma loja
import { UserCommum } from '../CommonUser/models'; // Importa o modelo de dados do usuário comum
import { Product } from '../Product/model/product'; // Importa o modelo de dados de produtos
import { Employees } from '../Employees/model'; // Importa o modelo de dados dos funcionários
import { Order } from '../Orders/models'; // Importa o modelo de dados de pedidos
import { AdressClass } from './dto/model/adress-class-suport'; // Importa a classe que representa o endereço da loja

const prompt = PromptSync();  // Instancia o prompt para capturar entradas no terminal

async function main() {
  const storeService = new StoreService();
  await storeService.init();  // Inicializa o serviço

  let exit = false;

  // Loop de escolha de ações
  while (!exit) {
    console.log("\n--- Menu de Opções ---");
    console.log("1. Criar Loja");
    console.log("2. Atualizar Loja");
    console.log("3. Excluir Loja");
    console.log("4. Listar Lojas");
    console.log("5. Sair");

    const choice = prompt("Escolha uma opção (1-5): ");

    switch (choice) {
      case "1":
        await createStore(storeService);
        break;
      case "2":
        await updateStore(storeService);
        break;
      case "3":
        await deleteStore(storeService);
        break;
      case "4":
        await listStores(storeService);
        break;
      case "5":
        exit = true;
        console.log("Saindo do sistema...");
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }
}

async function createStore(storeService: StoreService) {
  try {
    console.log("\n--- Criar Loja ---");
    
    // Coleta os dados necessários
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

async function updateStore(storeService: StoreService) {
  try {
    console.log("\n--- Atualizar Loja ---");

    const storeId = prompt("ID da loja para atualizar: ");
    const ownerId = prompt("ID do proprietário da loja: ");
    
    // Coleta os dados a serem atualizados
    const newName = prompt("Novo nome da loja: ");
    const newStreet = prompt("Nova rua: ");
    const newCity = prompt("Nova cidade: ");
    const newState = prompt("Novo estado: ");
    const newPostalCode = prompt("Novo código postal: ");
    const newZip = prompt("Novo CEP: ");

    // Cria o novo objeto de endereço com todos os campos exigidos
    const updatedAdress = new AdressClass();
    updatedAdress.street = newStreet;
    updatedAdress.city = newCity;
    updatedAdress.state = newState;
    updatedAdress.postalCode = newPostalCode;
    updatedAdress.zip = newZip;

    // Cria o objeto de dados de atualização para a loja
    const updateData = { 
      name: newName, 
      adress: [updatedAdress] // Agora o endereço está completo
    };
    
    await storeService.updateStore(storeId, ownerId, updateData);
    console.log("Loja atualizada com sucesso!");
  } catch (error: any) {
    console.error("Erro ao atualizar a loja:", error.message);
  }
}


async function deleteStore(storeService: StoreService) {
  try {
    console.log("\n--- Excluir Loja ---");

    const storeId = prompt("ID da loja para excluir: ");
    const ownerId = prompt("ID do proprietário da loja: ");
    
    await storeService.deleteStore(storeId, ownerId);
    console.log("Loja excluída com sucesso!");
  } catch (error: any) {
    console.error("Erro ao excluir a loja:", error.message);
  }
}

async function listStores(storeService: StoreService) {
  try {
    console.log("\n--- Lista de Lojas ---");

    const stores = await storeService.getStoreList();
    if (stores.length === 0) {
      console.log("Nenhuma loja cadastrada.");
    } else {
      stores.forEach((store) => {
        console.log(`ID: ${store.id}, Nome: ${store.name}`);
      });
    }
  } catch (error: any) {
    console.error("Erro ao listar as lojas:", error.message);
  }
}

// Inicia o programa
main();
