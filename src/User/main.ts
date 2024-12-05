// Importação dos módulos necessários
import { UserService } from "./service"; // Importa o serviço responsável por manipular usuários
import { UserDto } from './dto'; // Importa o Data Transfer Object (DTO) que define a estrutura de dados do usuário
import { User } from "./model"; // Importa o modelo de dados do usuário
import promptSync from "prompt-sync"; // Importa o módulo para capturar entradas do usuário no terminal
import { hash } from "crypto"; // Importa o módulo para criptografar dados, embora não esteja sendo usado diretamente no código

// Cria uma instância de promptSync para capturar entradas do usuário de forma síncrona
const prompt = promptSync();

// Função principal assíncrona
async function main() {
    // Cria uma instância do UserService
    const userService = new UserService();
    
    // Chama o método init para inicializar o serviço (pode ser usado para inicializar conexão com banco de dados, por exemplo)
    await userService.init();

    // Solicita que o usuário insira os dados pessoais no terminal
    const name = prompt("Digite seu nome: ");
    const age = parseInt(prompt("Digite sua idade: ")); // A idade é convertida para um número inteiro
    const email = prompt("Digite seu email: ");
    const password = prompt("Digite sua senha: ", { echo: '*' }); // A senha é oculta ao ser digitada

    // Cria o DTO com as informações fornecidas pelo usuário
    const userDto: UserDto = {
        name: name,
        age: age,
        email: email,
        password: password, // Senha fornecida pelo usuário
        avatarUrl: 'https://example.com/avatar.jpg', // Um URL fictício para o avatar do usuário
    };

    try {
        // Chama o método createUser do UserService para criar um novo usuário com os dados fornecidos
        const newUser = await userService.createUser(userDto);
        console.log('Usuário criado com sucesso:', newUser); // Exibe uma mensagem de sucesso no console
    } catch (error: any) {
        // Caso ocorra algum erro ao criar o usuário, captura e exibe a mensagem de erro
        console.error('Erro ao criar usuário:', error.message);
    }

    // Definindo um novo DTO com dados fictícios para atualizar o usuário
    const userDtoUpdate: UserDto = {
        name: 'Vinicius', // Nome alterado
        age: 21, // Idade alterada
        email: 'viniciusscheck@hotmail.com', // Email alterado
        password: '22222151', // Senha alterada
        avatarUrl: 'https://example.com/avatar.jpg', // URL do avatar mantido
    };

    try {
        // Definindo o ID do usuário que será atualizado (ID fictício)
        const userId = "7d7236f4-5acd-470e-b64b-81f5f7146a3f"; 
        
        // Criando o objeto `updatedData` com as informações para atualização
        const updatedData: Partial<User> = {
            name: userDtoUpdate.name,
            age: userDtoUpdate.age,
            email: userDtoUpdate.email,
            password: userDtoUpdate.password,
            avatarUrl: userDtoUpdate.avatarUrl,
        };
    
        // Chama o método updateUser do UserService para atualizar os dados do usuário
        const updatedUser = await userService.updateUser(userId, updatedData);
        console.log('Usuário atualizado com sucesso:', updatedUser); // Exibe uma mensagem de sucesso no console
    } catch (error: any) {
        // Caso ocorra algum erro ao atualizar o usuário, captura e exibe a mensagem de erro
        console.error('Erro ao atualizar usuário:', error.message);
    }
}

// Chama a função principal e captura erros globais
main().catch(err => {
    // Caso algum erro inesperado aconteça, exibe no console
    console.error('Erro na execução do main:', err);
});
