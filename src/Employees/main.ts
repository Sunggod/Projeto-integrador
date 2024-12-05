import promptSync from 'prompt-sync';
import { EmployeesService } from './service';
import { EmployeeDto } from './dto/index';
import { Role } from './types';
import { validateRole } from './utils';

const prompt = promptSync();

async function main() {
    const employeesService = new EmployeesService();
    await employeesService['init'](); // Chamando o método privado init

    console.log('Bem-vindo ao sistema de gerenciamento de funcionários!');

    let running = true;

    while (running) {
        console.log(`
        Escolha uma opção:
        1. Criar um novo funcionário
        2. Atualizar informações de um funcionário
        3. Deletar um funcionário
        4. Listar todos os funcionários
        5. Buscar funcionário por ID
        6. Sair
        `);

        const option = prompt('Opção: ');

        try {
            switch (option) {
                case '1': {
                    console.log('--- Criar um novo funcionário ---');
                    const name = prompt('Digite o nome do funcionário: ');
                    const email = prompt('Digite o email do funcionário: ');
                    const password = prompt('Digite a senha do funcionário: ');
                    const age = parseInt(prompt('Digite a idade do funcionário: '), 10);
                    const roleInput = prompt('Digite o cargo do funcionário (manager, stockAnalyst, logisticsManager, salesManager, dataAnalyst): ');

                    const role: Role = validateRole(roleInput) ? roleInput as Role : "manager"; 

                    const storeId = prompt('Digite o ID da loja: ');
                    const bossId = prompt('Digite o ID do chefe: ');
                    const imageUrl = prompt('Digite a URL da imagem do funcionário: ');
                    const cpf = prompt('Digite o CPF do funcionário: ');

                    const employeeDto: EmployeeDto = {
                        name,
                        email,
                        password,
                        age,
                        role,
                        storeId,
                        bossId,
                        imageUrl,
                        cpf,
                    };

                    await employeesService.createEmployee(employeeDto, storeId, bossId);
                    break;
                }

                case '2': {
                    console.log('--- Atualizar informações de um funcionário ---');
                    const id = prompt('Digite o ID do funcionário: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const bossId = prompt('Digite o ID do chefe: ');

                    const update = {};
                    const updateName = prompt('Novo nome (deixe vazio para manter o atual): ');
                    const updateEmail = prompt('Novo email (deixe vazio para manter o atual): ');
                    const updateRole = prompt('Novo cargo (deixe vazio para manter o atual): ');

                    // Se o cargo for fornecido, validar se é um valor válido
                    if (updateRole && validateRole(updateRole)) {
                        Object.assign(update, { role: updateRole as Role });
                    }

                    if (updateName) Object.assign(update, { name: updateName });
                    if (updateEmail) Object.assign(update, { email: updateEmail });

                    const updatedEmployee = await employeesService.updateEmployee({ id } as any, storeId, bossId, update);
                    console.log('Funcionário atualizado com sucesso:', updatedEmployee);
                    break;
                }

                case '3': {
                    console.log('--- Deletar um funcionário ---');
                    const id = prompt('Digite o ID do funcionário: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const bossId = prompt('Digite o ID do chefe: ');

                    await employeesService.deleteEmployee(id, storeId, bossId);
                    console.log('Funcionário deletado com sucesso!');
                    break;
                }

                case '4': {
                    console.log('--- Listar todos os funcionários ---');
                    const employees = await employeesService.getEmployees();
                    console.log('Funcionários:', employees);
                    break;
                }

                case '5': {
                    console.log('--- Buscar funcionário por ID ---');
                    const id = prompt('Digite o ID do funcionário: ');
                    const employee = await employeesService.getEmployeeById(id);
                    console.log('Funcionário encontrado:', employee);
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
