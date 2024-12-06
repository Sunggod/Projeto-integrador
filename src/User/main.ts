import { UserService } from "./service";
import { UserDto } from './dto';
import { User } from "./model";
import promptSync from "prompt-sync"; 

const prompt = promptSync();

async function main() {
    const userService = new UserService();
    await userService.init();

    let exit = false;

    while (!exit) {
        console.log("\nMenu de Opções:");
        console.log("1. Criar novo usuário");
        console.log("2. Atualizar usuário");
        console.log("3. Deletar usuário");
        console.log("4. Ver todos os usuários");
        console.log("5. Ver usuário por ID");
        console.log("6. Sair");

        const choice = prompt("Escolha uma opção (1-6): ");

        switch (choice) {
            case '1':
                await createUser(userService);
                break;
            case '2':
                await updateUser(userService);
                break;
            case '3':
                await deleteUser(userService);
                break;
            case '4':
                await viewAllUsers(userService);
                break;
            case '5':
                await viewUserById(userService);
                break;
            case '6':
                exit = true;
                console.log("Saindo...");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}

async function createUser(userService: UserService) {
    const name = prompt("Digite seu nome: ");
    const age = parseInt(prompt("Digite sua idade: "));
    const email = prompt("Digite seu email: ");
    const password = prompt("Digite sua senha: ", { echo: '*' });

    const userDto: UserDto = {
        name: name,
        age: age,
        email: email,
        password: password,
        avatarUrl: 'https://example.com/avatar.jpg',
        stores: [] 
    };

    try {
        const newUser = await userService.createUser(userDto);
        console.log('Usuário criado com sucesso:', newUser);
    } catch (error: any) {
        console.error('Erro ao criar usuário:', error.message);
    }
}

async function updateUser(userService: UserService) {
    const userId = prompt("Digite o ID do usuário a ser atualizado: ");
    const name = prompt("Novo nome (deixe em branco para manter): ");
    const age = prompt("Nova idade (deixe em branco para manter): ");
    const email = prompt("Novo email (deixe em branco para manter): ");
    const password = prompt("Nova senha (deixe em branco para manter): ", { echo: '*' });

    const updatedData: Partial<User> = {};
    if (name) updatedData.name = name;
    if (age) updatedData.age = parseInt(age);
    if (email) updatedData.email = email;
    if (password) updatedData.password = password;

    try {
        const updatedUser = await userService.updateUser(userId, updatedData);
        console.log('Usuário atualizado com sucesso:', updatedUser);
    } catch (error: any) {
        console.error('Erro ao atualizar usuário:', error.message);
    }
}

async function deleteUser(userService: UserService) {
    const userId = prompt("Digite o ID do usuário a ser deletado: ");
    try {
        await userService.deleteUser(userId);
        console.log("Usuário deletado com sucesso.");
    } catch (error: any) {
        console.error('Erro ao deletar usuário:', error.message);
    }
}

async function viewAllUsers(userService: UserService) {
    try {
        const users = await userService.getAllUsers();
        if (users.length === 0) {
            console.log("Nenhum usuário encontrado.");
        } else {
            console.log("Usuários cadastrados:");
            users.forEach(user => {
                console.log(`ID: ${user.id}, Nome: ${user.name}, Email: ${user.email}`);
            });
        }
    } catch (error: any) {
        console.error('Erro ao recuperar usuários:', error.message);
    }
}

async function viewUserById(userService: UserService) {
    const userId = prompt("Digite o ID do usuário a ser visualizado: ");
    try {
        const user = await userService.getUserById(userId);
        console.log("Detalhes do usuário:", user);
    } catch (error: any) {
        console.error('Erro ao recuperar o usuário:', error.message);
    }
}

main().catch(err => {
    console.error('Erro na execução do main:', err);
});
