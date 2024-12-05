// Importação dos módulos e dependências necessárias
import PromptSync, * as promptSync from 'prompt-sync'; // Importa o módulo de captura de entradas do usuário de forma síncrona
import { StoreService } from './service/index.service'; // Importa o serviço responsável pela lógica de criação de lojas
import { StoreDTO } from './dto'; // Importa o DTO (Data Transfer Object) para representar os dados de uma loja
import { UserCommum } from '../CommonUser/models'; // Importa o modelo de dados do usuário comum
import { Product } from '../Product/model/product'; // Importa o modelo de dados de produtos
import { Employees } from '../Employees/model'; // Importa o modelo de dados dos funcionários
import { Order } from '../Orders/models'; // Importa o modelo de dados de pedidos
import { AdressClass } from './dto/model/adress-class-suport'; // Importa a classe que representa o endereço da loja

// Instancia o prompt para captura de entradas no terminal
const prompt = PromptSync();

// Função principal assíncrona onde ocorre a lógica de criação da loja
async function main() {
  // Cria uma instância do serviço StoreService
  const storeService = new StoreService();

  try {
    // Inicializa o serviço StoreService (isso pode envolver inicialização de banco de dados, por exemplo)
    await storeService.init();

    // Exibe uma mensagem de boas-vindas
    console.log("Bem-vindo ao sistema de criação de lojas!");

    // Captura os dados da loja inseridos pelo usuário
    const name = prompt("Nome da loja: ");
    const ownerId = prompt("ID do proprietário da loja: ");

    // Captura os dados de endereço
    const street = prompt("Rua: ");
    const city = prompt("Cidade: ");
    const state = prompt("Estado: ");
    const postalCode = prompt("Código Postal: ");
    const zip = prompt("CEP: ");
    
    // Cria uma instância de AdressClass para representar o endereço da loja
    const adress = new AdressClass();
    adress.street = street;
    adress.city = city;
    adress.state = state;
    adress.postalCode = postalCode;
    adress.zip = zip;

    // Captura os horários de funcionamento da loja
    const openingHours = prompt("Hora de abertura (ex: 08:00): ");
    const closingTime = prompt("Hora de fechamento (ex: 18:00): ");
    
    // Cria objetos Date com base nas horas de abertura e fechamento inseridas
    const openingDate = new Date(`1970-01-01T${openingHours}:00`);
    const closingDate = new Date(`1970-01-01T${closingTime}:00`);

    // Captura as URLs das imagens do banner e logo
    const imageBannerUrl = prompt("URL da imagem do banner: ");
    const imageLogoUrl = prompt("URL da imagem do logo: ");
    
    // Inicializa arrays vazios para funcionários, produtos e pedidos (ainda não adicionados)
    const employees: Employees[] = []; 
    const products: Product[] = []; 
    const orders: Order[] = []; 
    const userCommum: UserCommum[] = [];

    // Cria o objeto StoreDTO com todos os dados capturados do usuário
    const storeDTO: StoreDTO = {
      name,
      adress: [adress], // Endereço da loja, encapsulado em um array
      owner: ownerId,
      openingHours: openingDate,
      closingTime: closingDate,
      imageBannerUrl: imageBannerUrl || undefined, // Se não houver URL do banner, será undefined
      imageLogoUrl: imageLogoUrl || undefined, // Se não houver URL do logo, será undefined
      employees, // Lista de funcionários (ainda vazia)
      products, // Lista de produtos (ainda vazia)
      orders, // Lista de pedidos (ainda vazia)
      userCommum // Lista de usuários (ainda vazia)
    };

    // Chama o método createStore do serviço StoreService para criar a loja no sistema
    const newStore = await storeService.createStore(storeDTO, ownerId);
    
    // Exibe a mensagem de sucesso com o nome da loja e o ID do proprietário
    console.log(`Loja criada com sucesso: ${newStore.name}, com o dono ID ${newStore.owner}`);
  } catch (error: any) {
    // Caso haja algum erro ao criar a loja, captura e exibe a mensagem de erro
    console.error("Erro ao criar a loja:", error.message);
  }
}

// Chama a função principal para iniciar o processo de criação da loja
main();
