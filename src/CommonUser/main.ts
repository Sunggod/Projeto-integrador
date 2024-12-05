// Importação dos módulos necessários
import promptSync from 'prompt-sync'; // Módulo para capturar entradas do usuário de forma síncrona
import { UserComumnService } from './Service'; // Serviço que contém a lógica para manipulação de usuários comuns
import { UserCommumDto } from './dto'; // DTO que define os dados necessários para criar ou atualizar um usuário comum
import { Adress } from '../Store/interface/adress.interface'; // Interface para o endereço do usuário

// Instância do prompt para capturar entradas no terminal
const prompt = promptSync();

// Função principal assíncrona que implementa o sistema de gerenciamento de usuários comuns
async function main() {
    // Criação de uma instância do serviço UserComumnService
    const userCommumService = new UserComumnService();
    await userCommumService.init(); // Inicializa o serviço (pode envolver configurações, como banco de dados)

    console.log('Bem-vindo ao sistema de gerenciamento de usuários comuns!');

    // Variável de controle para manter o loop do menu até o usuário escolher sair
    let running = true;

    // Loop principal do menu interativo
    while (running) {
        console.log(`
        Escolha uma opção:
        1. Criar um novo usuário comum
        2. Listar todos os usuários comuns de uma loja
        3. Buscar usuário comum por ID
        4. Atualizar informações de um usuário comum
        5. Excluir um usuário comum
        6. Sair
        `);

        // Captura a opção escolhida pelo usuário
        const option = prompt('Opção: ');

        try {
            // Switch case para manipular as diferentes opções do menu
            switch (option) {
                // Caso 1: Criar um novo usuário comum
                case '1': {
                    console.log('--- Criar um novo usuário comum ---');
                    
                    // Coleta as informações do usuário
                    const name = prompt('Digite o nome do usuário: ');
                    const email = prompt('Digite o email do usuário: ');
                    const password = prompt('Digite a senha do usuário: ', { echo: '*' });
                    const age = parseInt(prompt('Digite a idade do usuário: '));
                    const pictureImage = prompt('Digite a URL da imagem do usuário: ');

                    // Coleta as informações do endereço
                    console.log('Digite o endereço do usuário:');
                    const street = prompt('Rua: ');
                    const city = prompt('Cidade: ');
                    const state = prompt('Estado: ');
                    const zip = prompt('CEP: ');

                    // Construa o objeto de endereço
                    const adress: Adress = { street, city, state, zip };

                    const storeId = prompt('Digite o ID da loja: ');

                    // Criação do DTO do usuário comum
                    const userDto: UserCommumDto = {
                        name,
                        email,
                        password,
                        age,
                        pictureImage,
                        adress,
                        storeId,
                        cart: undefined // Sem informações do carrinho no momento da criação
                    };

                    // Chama o método para criar o novo usuário
                    const newUser = await userCommumService.createUserCommum(userDto, storeId);
                    console.log('Usuário criado com sucesso:', newUser);
                    break;
                }

                // Caso 2: Listar todos os usuários comuns de uma loja
                case '2': {
                    console.log('--- Listar todos os usuários comuns ---');
                    
                    const storeId = prompt('Digite o ID da loja: ');
                    // Chama o método para buscar todos os usuários comuns da loja
                    const users = await userCommumService.getAllUserCommum(storeId);
                    console.log('Usuários comuns na loja:', users);
                    break;
                }

                // Caso 3: Buscar um usuário comum por ID
                case '3': {
                    console.log('--- Buscar usuário comum por ID ---');
                    
                    const userId = prompt('Digite o ID do usuário: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    // Chama o método para buscar o usuário pelo ID
                    await userCommumService.getUserCommumById(userId, storeId);
                    break;
                }

                // Caso 4: Atualizar informações de um usuário comum
                case '4': {
                    console.log('--- Atualizar informações de um usuário comum ---');
                    
                    const userId = prompt('Digite o ID do usuário: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const name = prompt('Novo nome do usuário (deixe vazio para manter o atual): ');
                    const email = prompt('Novo email do usuário (deixe vazio para manter o atual): ');

                    // Criação do objeto de atualização
                    const updateData = {
                        ...(name && { name }),  // Se o nome for informado, adiciona ao objeto de atualização
                        ...(email && { email }), // Se o email for informado, adiciona ao objeto de atualização
                    };

                    // Chama o método para atualizar as informações do usuário
                    await userCommumService.updateUserCommum(userId, storeId, updateData);
                    console.log('Usuário atualizado com sucesso!');
                    break;
                }

                // Caso 5: Excluir um usuário comum
                case '5': {
                    console.log('--- Excluir usuário comum ---');
                    
                    const userId = prompt('Digite o ID do usuário: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const ownerId = prompt('Digite o ID do proprietário da loja: ');
                    // Chama o método para excluir o usuário
                    await userCommumService.deleteUserCommum(userId, storeId, ownerId);
                    console.log('Usuário excluído com sucesso!');
                    break;
                }

                // Caso 6: Sair do sistema
                case '6':
                    console.log('Saindo do sistema. Até logo!');
                    running = false; // Finaliza o loop e sai do sistema
                    break;

                // Caso a opção seja inválida
                default:
                    console.log('Opção inválida. Tente novamente.');
            }
        } catch (error: any) {
            // Captura e exibe erros durante as operações
            console.error('Erro:', error.message);
        }
    }
}

// Executa a função principal
main().catch((err) => {
    console.error('Erro ao executar o sistema:', err.message); // Exibe erro caso o programa não consiga ser executado
});
