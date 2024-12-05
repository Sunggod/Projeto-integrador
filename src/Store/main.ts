import promptSync from 'prompt-sync';
import { StoreService } from './service/index.service';
import { StoreDTO } from './dto';
import { Adress } from './interface/adress.interface';

const prompt = promptSync();

async function main() {
    const storeService = new StoreService();
    await storeService['init'](); 

    console.log('Bem-vindo ao sistema de gerenciamento de lojas!');

    let running = true;

    while (running) {
        console.log(`
        Escolha uma opção:
        1. Criar uma nova loja
        2. Atualizar loja
        3. Listar todas as lojas
        4. Buscar loja por ID
        5. Deletar loja
        6. Sair
        `);

        const option = prompt('Opção: ');

        try {
            switch (option) {
                case '1': {
                    console.log('--- Criar uma nova loja ---');
                    const name = prompt('Digite o nome da loja: ');
                    
                    const adressCount = parseInt(prompt('Quantos endereços deseja adicionar? (Digite um número): ') || '0', 10);
                    const adress: Adress[] = [];

                    for (let i = 0; i < adressCount; i++) {
                        console.log(`--- Endereço ${i + 1} ---`);
                        const street = prompt('Digite a rua: ');
                        const city = prompt('Digite a cidade: ');
                        const state = prompt('Digite o estado: ');
                        const zip = prompt('Digite o CEP: ');

                        adress.push({ street, city, state, zip });
                    }

                    const openingHours = new Date(`1970-01-01T${prompt('Digite o horário de abertura (ex: 08:00): ')}:00`);
                    const closingTime = new Date(`1970-01-01T${prompt('Digite o horário de fechamento (ex: 18:00): ')}:00`);
                    const imageBannerUrl = prompt('Digite a URL do banner: ');
                    const imageLogoUrl = prompt('Digite a URL do logo: ');
                    const ownerId = prompt('Digite o ID do proprietário: ');

                    const storeDTO: StoreDTO = {
                        name,
                        adress,
                        openingHours,
                        owner : ownerId,
                        closingTime,
                        imageBannerUrl,
                        imageLogoUrl,
                        employees: [],
                        products: [],
                        orders: [],
                        userCommum: [],
                    };

                    const newStore = await storeService.createStore(storeDTO, ownerId);
                    console.log('Loja criada com sucesso:', newStore);
                    break;
                }

                case '2': {
                    console.log('--- Atualizar loja ---');
                    const storeId = prompt('Digite o ID da loja: ');
                    const ownerId = prompt('Digite o ID do proprietário: ');
                    const name = prompt('Novo nome da loja (deixe vazio para manter o atual): ');

                    const updateAdress = prompt('Deseja atualizar os endereços? (sim/não): ')?.toLowerCase() === 'sim';

                    let adress: Adress[] | undefined;
                    if (updateAdress) {
                        const adressCount = parseInt(prompt('Quantos novos endereços deseja adicionar? (Digite um número): ') || '0', 10);
                        adress = [];

                        for (let i = 0; i < adressCount; i++) {
                            console.log(`--- Novo Endereço ${i + 1} ---`);
                            const street = prompt('Digite a rua: ');
                            const city = prompt('Digite a cidade: ');
                            const state = prompt('Digite o estado: ');
                            const zip = prompt('Digite o CEP: ');

                            adress.push({ street, city, state, zip });
                        }
                    }

                    const updateStore = {
                        ...(name && { name }),
                        ...(adress && { adress }),
                    };

                    await storeService.updateStore(storeId, ownerId, updateStore);
                    console.log('Loja atualizada com sucesso!');
                    break;
                }

                case '3': {
                    console.log('--- Listar todas as lojas ---');
                    const stores = await storeService.getStoreList();
                    console.log('Lojas disponíveis:', stores);
                    break;
                }

                case '4': {
                    console.log('--- Buscar loja por ID ---');
                    const storeId = prompt('Digite o ID da loja: ');
                    const store = await storeService.getStoreById(storeId);
                    console.log('Loja encontrada:', store);
                    break;
                }

                case '5': {
                    console.log('--- Deletar loja ---');
                    const storeId = prompt('Digite o ID da loja: ');
                    const ownerId = prompt('Digite o ID do proprietário: ');
                    await storeService.deleteStore(storeId, ownerId);
                    console.log('Loja deletada com sucesso!');
                    break;
                }

                case '6':
                    console.log('Saindo do sistema. Até logo!');
                    running = false;
                    break;

                default:
                    console.log('Opção inválida. Tente novamente.');
            }
        } catch (error: any) {
            console.error('Erro:', error.message);
        }
    }
}

// Executa o programa
main().catch(err => {
    console.error('Erro ao executar o sistema:', err.message);
});
