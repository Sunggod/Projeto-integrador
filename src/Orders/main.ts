// Importação dos módulos e dependências necessários
import promptSync from 'prompt-sync'; // Módulo para capturar entradas do usuário de forma síncrona
import { OrderService } from './Services/index.service'; // Importa o serviço responsável pela lógica de manipulação de pedidos
import { OrderDto } from './dto'; // Importa o DTO que representa os dados necessários para criar ou atualizar um pedido
import { Product } from '../Product/model/product'; // Importa o modelo de produto
import { OrderStatus } from './enums/order-status-enum'; // Importa o enum que define os diferentes status de pedidos

// Instância do prompt para capturar entradas no terminal
const prompt = promptSync();

// Função principal assíncrona onde ocorre a lógica de gerenciamento de pedidos
async function main() {
    // Criação de uma instância do serviço OrderService
    const orderService = new OrderService();
    await orderService['init']();  // Inicializa o serviço (pode envolver configurações como banco de dados)

    console.log('Bem-vindo ao sistema de gerenciamento de pedidos!');

    // Variável de controle para manter o loop do menu até o usuário escolher sair
    let running = true;

    // Loop principal para o menu interativo de opções
    while (running) {
        console.log(`
        Escolha uma opção:
        1. Criar um novo pedido
        2. Atualizar um pedido
        3. Deletar um pedido
        4. Listar pedidos de uma loja
        5. Sair
        `);

        // Captura a opção escolhida pelo usuário
        const option = prompt('Opção: ');

        try {
            // Switch case para manipular as diferentes opções do menu
            switch (option) {
                // Caso 1: Criar um novo pedido
                case '1': {
                    console.log('--- Criar um novo pedido ---');
                    
                    // Captura os dados necessários para criar um novo pedido
                    const userId = prompt('Digite o ID do usuário: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const productIds = prompt('Digite os IDs dos produtos (separados por vírgulas): ')
                        .split(',') // Divide os IDs de produtos fornecidos
                        .map(id => id.trim()); // Remove espaços em branco

                    // Criação de objetos de produtos com base nos IDs fornecidos
                    const products: Product[] = productIds.map(id => {
                        const product = new Product(
                            "name",
                            100.0, // preço
                            10, // estoque
                            'Marca X', // marca
                            storeId, // loja
                            'ativo', // status
                            new Date('2024-12-31'), // data de validade
                            'urlImagem', // URL da imagem
                            80.0 // preço de fábrica
                        );
                        return product;
                    });

                    // Captura o preço total, data de início, data de entrega, e data de processamento
                    const totalPrice = parseFloat(prompt('Digite o preço total do pedido: '));
                    const startDate = new Date(prompt('Digite a data de início (YYYY-MM-DD): '));
                    const deliveryDate = new Date(prompt('Digite a data de entrega (YYYY-MM-DD): '));
                    const dataProcessing = new Date(prompt('Digite a data de processamento (YYYY-MM-DD): '));
                    
                    // Captura o status do pedido a partir do enum OrderStatus
                    const status = prompt('Digite o status do pedido: ') as OrderStatus;

                    // Criação do objeto DTO com os dados fornecidos
                    const orderDto: OrderDto = {
                        userId,
                        products,
                        totalPrice,
                        startDate,
                        deliveryDate,
                        DataProcessing: dataProcessing,  
                        status,
                    };

                    // Chama o método para criar o pedido no sistema
                    await orderService.CreateOrders(orderDto, storeId);
                    break;
                }

                // Caso 2: Atualizar um pedido existente
                case '2': {
                    console.log('--- Atualizar um pedido ---');
                    
                    // Captura o ID do pedido e os dados da loja
                    const orderId = prompt('Digite o ID do pedido: ');
                    const storeId = prompt('Digite o ID da loja: ');

                    // Captura os dados que podem ser atualizados: status e data de entrega
                    const status = prompt('Novo status do pedido (deixe vazio para manter o atual): ') as OrderStatus | ''; 
                    const deliveryDate = prompt('Nova data de entrega (YYYY-MM-DD, deixe vazio para manter a atual): ');

                    // Criação do objeto com os dados atualizados
                    const updatedOrder = {
                        ...(status && { status }), // Atualiza status se fornecido
                        ...(deliveryDate && { deliveryDate: new Date(deliveryDate) }), // Atualiza data de entrega se fornecido
                    };

                    // Chama o método para atualizar o pedido no sistema
                    const order = await orderService.UpdateOrders(orderId, storeId, updatedOrder);
                    console.log('Pedido atualizado com sucesso:', order);
                    break;
                }

                // Caso 3: Excluir um pedido
                case '3': {
                    console.log('--- Deletar um pedido ---');
                    
                    // Captura o ID do pedido, da loja e do proprietário
                    const orderId = prompt('Digite o ID do pedido: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const ownerId = prompt('Digite o ID do proprietário da loja: ');

                    // Chama o método para deletar o pedido
                    await orderService.DeleteOrder(orderId, storeId, ownerId);
                    console.log('Pedido deletado com sucesso!');
                    break;
                }

                // Caso 4: Listar pedidos de uma loja
                case '4': {
                    console.log('--- Listar pedidos de uma loja ---');
                    
                    // Captura o ID da loja
                    const storeId = prompt('Digite o ID da loja: ');

                    // Busca a loja e exibe seus pedidos
                    const store = orderService['fileRepo'].getStores().find((s) => s.id === storeId);
                    if (store) {
                        console.log('Pedidos da loja:', store.order);  // Exibe os pedidos da loja
                    } else {
                        console.log('Loja não encontrada.');
                    }
                    break;
                }

                // Caso 5: Sair do sistema
                case '5':
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
