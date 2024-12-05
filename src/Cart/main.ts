// Importação dos módulos necessários
import promptSync from 'prompt-sync'; // Módulo para capturar entradas do usuário de forma síncrona
import { CartService } from './Service'; // Serviço que contém a lógica para manipulação de carrinhos de compras
import { Product } from '../Product/model/product'; // Modelo que define os dados do produto

// Instância do prompt para capturar entradas no terminal
const prompt = promptSync();

// Função principal assíncrona que implementa o sistema de carrinho de compras
async function main() {
    // Criação de uma instância do serviço CartService
    const cartService = new CartService();
    await cartService['init'](); // Inicializa o serviço (pode envolver configurações como banco de dados)

    console.log('Bem-vindo ao sistema de carrinho!');

    // Captura os IDs do usuário e da loja
    const userId = prompt('Digite o ID do usuário: ');
    const storeId = prompt('Digite o ID da loja: ');

    // Variável de controle para manter o loop do menu até o usuário escolher sair
    let running = true;

    // Loop principal do menu interativo
    while (running) {
        console.log(`
        Escolha uma opção:
        1. Criar um novo carrinho
        2. Adicionar produto ao carrinho
        3. Remover produto do carrinho
        4. Finalizar compra (checkout)
        5. Sair
        `);

        // Captura a opção escolhida pelo usuário
        const option = prompt('Opção: ');

        try {
            // Switch case para manipular as diferentes opções do menu
            switch (option) {
                // Caso 1: Criar um novo carrinho
                case '1': {
                    console.log('--- Criando um novo carrinho ---');
                    const newCart = await cartService.createCart(userId, storeId);
                    console.log('Carrinho criado:', newCart);
                    break;
                }

                // Caso 2: Adicionar produto ao carrinho
                case '2': {
                    console.log('--- Adicionar produto ---');
                    const productId = prompt('Digite o ID do produto: ');
                    
                    // Busca o produto pelo ID na loja especificada
                    const product = await cartService.getProductById(storeId, productId);
                    
                    // Se o produto for encontrado, adiciona ao carrinho
                    if (product) {
                        const updatedCart = await cartService.addProductToCart(userId, storeId, product);
                        console.log('Produto adicionado. Carrinho atualizado:', updatedCart);
                    } else {
                        console.log('Produto não encontrado.');
                    }
                    break;
                }

                // Caso 3: Remover produto do carrinho
                case '3': {
                    console.log('--- Remover produto ---');
                    const removeProductId = prompt('Digite o ID do produto a ser removido: ');
                    const cartAfterRemoval = await cartService.removeProductFromCart(userId, storeId, removeProductId);
                    console.log('Produto removido. Carrinho atualizado:', cartAfterRemoval);
                    break;
                }

                // Caso 4: Finalizar compra (checkout)
                case '4': {
                    console.log('--- Finalizar compra ---');
                    const checkedOutCart = await cartService.checkoutCart(userId, storeId);
                    console.log('Compra finalizada. Detalhes do carrinho:', checkedOutCart);
                    break;
                }

                // Caso 5: Sair do sistema
                case '5': {
                    console.log('Saindo do sistema. Até logo!');
                    running = false; // Finaliza o loop e sai do sistema
                    break;
                }

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
