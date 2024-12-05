import { UserService } from "./service";
import { UserDto } from './dto';
import { User } from "./model";
import promptSync from "prompt-sync";
import { hash } from "crypto";

const prompt = promptSync();

async function main() {
    const userService = new UserService();
    await userService.init();

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
    };

    try {
        const newUser = await userService.createUser(userDto);
        console.log('Usuário criado com sucesso:', newUser);
    } catch (error: any) {
        console.error('Erro ao criar usuário:', error.message);
    }

    const userDtoUpdate: UserDto = {
        name: 'Vinicius',
        age: 21,
        email: 'viniciusscheck@hotmail.com',
        password: '22222151',
        avatarUrl: 'https://example.com/avatar.jpg',
    };

    try {
        const userId = "7d7236f4-5acd-470e-b64b-81f5f7146a3f"; 
        const updatedData: Partial<User> = {
            name: userDtoUpdate.name,
            age: userDtoUpdate.age,
            email: userDtoUpdate.email,
            password: userDtoUpdate.password,
            avatarUrl: userDtoUpdate.avatarUrl,
        };
    
        const updatedUser = await userService.updateUser(userId, updatedData);
        console.log('Usuário atualizado com sucesso:', updatedUser);
    } catch (error: any) {
        console.error('Erro ao atualizar usuário:', error.message);
    }
}

main().catch(err => {
    console.error('Erro na execução do main:', err);
});
