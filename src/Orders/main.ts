import promptSync from 'prompt-sync';
import { OrderService } from './Services/index.service';
import { OrderDto } from './dto';
import { Product } from '../Product/model/product';
import { OrderStatus } from './enums/order-status-enum';

const prompt = promptSync();

async function main() {
    const orderService = new OrderService();
    await orderService['init'](); 

    console.log('Bem-vindo ao sistema de gerenciamento de pedidos!');

    let running = true;

    while (running) {
        console.log(`
        Escolha uma opção:
        1. Criar um novo pedido
        2. Atualizar um pedido
        3. Deletar um pedido
        4. Listar pedidos de uma loja
        5. Sair
        `);

        const option = prompt('Opção: ');

        try {
            switch (option) {
                case '1': {
                    console.log('--- Criar um novo pedido ---');
                    const userId = prompt('Digite o ID do usuário: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const productIds = prompt('Digite os IDs dos produtos (separados por vírgulas): ')
                        .split(',')
                        .map(id => id.trim());

                    const products: Product[] = productIds.map(id => {
                        const product = new Product(
                            "name",
                            100.0, // preço
                            10, // estoque
                            'Marca X', // marca
                            storeId, // loja
                            'ativo', // status
                            new Date('2024-12-31'), // data de validade
                            'urlImagem', // url da imagem
                            80.0 // valor de fábrica
                        );
                        return product;
                    });

                    const totalPrice = parseFloat(prompt('Digite o preço total do pedido: '));
                    const startDate = new Date(prompt('Digite a data de início (YYYY-MM-DD): '));
                    const deliveryDate = new Date(prompt('Digite a data de entrega (YYYY-MM-DD): '));
                    const dataProcessing = new Date(prompt('Digite a data de processamento (YYYY-MM-DD): '));
                    const status = prompt('Digite o status do pedido: ') as OrderStatus;  // Usando o enum OrderStatus

                    const orderDto: OrderDto = {
                        userId,
                        products,
                        totalPrice,
                        startDate,
                        deliveryDate,
                        DataProcessing: dataProcessing,  
                        status,
                    };

                    await orderService.CreateOrders(orderDto, storeId);
                    break;
                }

                case '2': {
                    console.log('--- Atualizar um pedido ---');
                    const orderId = prompt('Digite o ID do pedido: ');
                    const storeId = prompt('Digite o ID da loja: ');

                    const status = prompt('Novo status do pedido (deixe vazio para manter o atual): ') as OrderStatus | '';  // Usando o enum OrderStatus
                    const deliveryDate = prompt('Nova data de entrega (YYYY-MM-DD, deixe vazio para manter a atual): ');

                    const updatedOrder = {
                        ...(status && { status }),
                        ...(deliveryDate && { deliveryDate: new Date(deliveryDate) }),
                    };

                    const order = await orderService.UpdateOrders(orderId, storeId, updatedOrder);
                    console.log('Pedido atualizado com sucesso:', order);
                    break;
                }

                case '3': {
                    console.log('--- Deletar um pedido ---');
                    const orderId = prompt('Digite o ID do pedido: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const ownerId = prompt('Digite o ID do proprietário da loja: ');

                    await orderService.DeleteOrder(orderId, storeId, ownerId);
                    console.log('Pedido deletado com sucesso!');
                    break;
                }

                case '4': {
                    console.log('--- Listar pedidos de uma loja ---');
                    const storeId = prompt('Digite o ID da loja: ');

                    const store = orderService['fileRepo'].getStores().find((s) => s.id === storeId);
                    if (store) {
                        console.log('Pedidos da loja:', store.order);
                    } else {
                        console.log('Loja não encontrada.');
                    }
                    break;
                }

                case '5':
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
