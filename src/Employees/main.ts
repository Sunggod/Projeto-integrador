// Importação dos módulos e dependências necessários
import promptSync from 'prompt-sync'; // Módulo para capturar entradas do usuário de forma síncrona
import { EmployeesService } from './service'; // Serviço responsável pela lógica de manipulação de funcionários
import { EmployeeDto } from './dto/index'; // Importa o DTO com os dados necessários para criação ou atualização de um funcionário
import { Role } from './types'; // Tipo que define os cargos possíveis de um funcionário
import { validateRole } from './utils'; // Função que valida se o cargo fornecido é válido

// Instância do prompt para capturar entradas no terminal
const prompt = promptSync();

// Função principal assíncrona onde ocorre a lógica de gerenciamento de funcionários
async function main() {
    // Criação de uma instância do serviço EmployeesService
    const employeesService = new EmployeesService();
    await employeesService['init'](); // Inicializa o serviço (pode envolver configurações como banco de dados)

    console.log('Bem-vindo ao sistema de gerenciamento de funcionários!');

    // Variável de controle para manter o loop do menu até o usuário escolher sair
    let running = true;

    // Loop principal para o menu interativo de opções
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

        // Captura a opção escolhida pelo usuário
        const option = prompt('Opção: ');

        try {
            // Switch case para manipular as diferentes opções do menu
            switch (option) {
                // Caso 1: Criar um novo funcionário
                case '1': {
                    console.log('--- Criar um novo funcionário ---');
                    
                    // Captura os dados necessários para criar um novo funcionário
                    const name = prompt('Digite o nome do funcionário: ');
                    const email = prompt('Digite o email do funcionário: ');
                    const password = prompt('Digite a senha do funcionário: ');
                    const age = parseInt(prompt('Digite a idade do funcionário: '), 10);
                    const roleInput = prompt('Digite o cargo do funcionário (manager, stockAnalyst, logisticsManager, salesManager, dataAnalyst): ');

                    // Valida o cargo inserido
                    const role: Role = validateRole(roleInput) ? roleInput as Role : "manager"; 

                    const storeId = prompt('Digite o ID da loja: ');
                    const bossId = prompt('Digite o ID do chefe: ');
                    const imageUrl = prompt('Digite a URL da imagem do funcionário: ');
                    const cpf = prompt('Digite o CPF do funcionário: ');

                    // Criação do objeto DTO com os dados fornecidos
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

                    // Chama o método para criar o funcionário no sistema
                    await employeesService.createEmployee(employeeDto, storeId, bossId);
                    break;
                }

                // Caso 2: Atualizar informações de um funcionário
                case '2': {
                    console.log('--- Atualizar informações de um funcionário ---');
                    
                    // Captura o ID do funcionário, da loja e do chefe
                    const id = prompt('Digite o ID do funcionário: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const bossId = prompt('Digite o ID do chefe: ');

                    // Objeto para armazenar as informações a serem atualizadas
                    const update = {};
                    const updateName = prompt('Novo nome (deixe vazio para manter o atual): ');
                    const updateEmail = prompt('Novo email (deixe vazio para manter o atual): ');
                    const updateRole = prompt('Novo cargo (deixe vazio para manter o atual): ');

                    // Se o cargo for fornecido e válido, adiciona ao objeto de atualização
                    if (updateRole && validateRole(updateRole)) {
                        Object.assign(update, { role: updateRole as Role });
                    }

                    // Se nome ou email forem fornecidos, adiciona ao objeto de atualização
                    if (updateName) Object.assign(update, { name: updateName });
                    if (updateEmail) Object.assign(update, { email: updateEmail });

                    // Chama o método para atualizar as informações do funcionário no sistema
                    const updatedEmployee = await employeesService.updateEmployee({ id } as any, storeId, bossId, update);
                    console.log('Funcionário atualizado com sucesso:', updatedEmployee);
                    break;
                }

                // Caso 3: Excluir um funcionário
                case '3': {
                    console.log('--- Deletar um funcionário ---');
                    
                    // Captura o ID do funcionário, da loja e do chefe
                    const id = prompt('Digite o ID do funcionário: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const bossId = prompt('Digite o ID do chefe: ');

                    // Chama o método para deletar o funcionário
                    await employeesService.deleteEmployee(id, storeId, bossId);
                    console.log('Funcionário deletado com sucesso!');
                    break;
                }

                // Caso 4: Listar todos os funcionários
                case '4': {
                    console.log('--- Listar todos os funcionários ---');
                    
                    // Chama o método para buscar todos os funcionários
                    const employees = await employeesService.getEmployees();
                    console.log('Funcionários:', employees);
                    break;
                }

                // Caso 5: Buscar funcionário por ID
                case '5': {
                    console.log('--- Buscar funcionário por ID ---');
                    
                    // Captura o ID do funcionário e busca no sistema
                    const id = prompt('Digite o ID do funcionário: ');
                    const employee = await employeesService.getEmployeeById(id);
                    console.log('Funcionário encontrado:', employee);
                    break;
                }

                // Caso 6: Sair do sistema
                case '6':
                    console.log('Saindo do sistema. Até logo!');
                    running = false; // Finaliza o loop, saindo do programa
                    break;

                // Caso a opção não seja válida
                default:
                    console.log('Opção inválida. Tente novamente.');
            }
        } catch (error: any) {
            // Captura e exibe erros ocorridos durante as operações
            console.error('Erro:', error.message);
        }
    }
}

// Executa a função principal
main().catch((err) => {
    console.error('Erro ao executar o sistema:', err.message); // Exibe erro caso o programa não consiga ser executado
});
