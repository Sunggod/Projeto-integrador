import promptSync from 'prompt-sync';
import { UserComumnService } from './Service';
import { UserCommumDto } from './dto';
import { Adress } from '../Store/interface/adress.interface';

const prompt = promptSync();

async function main() {
    const userCommumService = new UserComumnService();
    await userCommumService.init(); 

    console.log('Bem-vindo ao sistema de gerenciamento de usuários comuns!');

    let running = true;

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

        const option = prompt('Opção: ');

        try {
            switch (option) {
                case '1': {
                    console.log('--- Criar um novo usuário comum ---');
                    const name = prompt('Digite o nome do usuário: ');
                    const email = prompt('Digite o email do usuário: ');
                    const password = prompt('Digite a senha do usuário: ' , { echo: '*' });
                    const age = parseInt(prompt('Digite a idade do usuário: '));
                    const pictureImage = prompt('Digite a URL da imagem do usuário: ');

                    // Coletando as informações do endereço
                    console.log('Digite o endereço do usuário:');
                    const street = prompt('Rua: ');
                    const city = prompt('Cidade: ');
                    const state = prompt('Estado: ');
                    const zip = prompt('CEP: ');

                    // Construindo o objeto de endereço
                    const adress: Adress = { street, city, state, zip };

                    const storeId = prompt('Digite o ID da loja: ');

                    const userDto: UserCommumDto = {
                        name,
                        email,
                        password,
                        age,
                        pictureImage,
                        adress,
                        storeId,
                        cart:undefined
                    };

                    const newUser = await userCommumService.createUserCommum(userDto, storeId);
                    console.log('Usuário criado com sucesso:', newUser);
                    break;
                }

                case '2': {
                    console.log('--- Listar todos os usuários comuns ---');
                    const storeId = prompt('Digite o ID da loja: ');
                    const users = await userCommumService.getAllUserCommum(storeId);
                    console.log('Usuários comuns na loja:', users);
                    break;
                }

                case '3': {
                    console.log('--- Buscar usuário comum por ID ---');
                    const userId = prompt('Digite o ID do usuário: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    await userCommumService.getUserCommumById(userId, storeId);
                    break;
                }

                case '4': {
                    console.log('--- Atualizar informações de um usuário comum ---');
                    const userId = prompt('Digite o ID do usuário: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const name = prompt('Novo nome do usuário (deixe vazio para manter o atual): ');
                    const email = prompt('Novo email do usuário (deixe vazio para manter o atual): ');

                    const updateData = {
                        ...(name && { name }),
                        ...(email && { email }),
                    };

                    await userCommumService.updateUserCommum(userId, storeId, updateData);
                    console.log('Usuário atualizado com sucesso!');
                    break;
                }

                case '5': {
                    console.log('--- Excluir usuário comum ---');
                    const userId = prompt('Digite o ID do usuário: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const ownerId = prompt('Digite o ID do proprietário da loja: ');
                    await userCommumService.deleteUserCommum(userId, storeId, ownerId);
                    console.log('Usuário excluído com sucesso!');
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
main().catch((err) => {
    console.error('Erro ao executar o sistema:', err.message);
});
