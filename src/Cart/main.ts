import promptSync from 'prompt-sync';
import { CartService } from './service';
import { Product } from '../Product/model/product';

const prompt = promptSync();

async function main() {
    const cartService = new CartService();
    await cartService['init'](); 

    console.log('Bem-vindo ao sistema de carrinho!');
    
    const userId = prompt('Digite o ID do usuário: ');
    const storeId = prompt('Digite o ID da loja: ');

    let running = true;

    while (running) {
        console.log(`
        Escolha uma opção:
        1. Criar um novo carrinho
        2. Adicionar produto ao carrinho
        3. Remover produto do carrinho
        4. Finalizar compra (checkout)
        5. Sair
        `);

        const option = prompt('Opção: ');

        try {
            switch (option) {
                case '1':
                    console.log('--- Criando um novo carrinho ---');
                    const newCart = await cartService.createCart(userId, storeId);
                    console.log('Carrinho criado:', newCart);
                    break;

                    case '2':
                        console.log('--- Adicionar produto ---');
                        const productId = prompt('Digite o ID do produto: ');
                    
                        // Buscar o produto na lista de produtos da loja
                        const product = await cartService.getProductById(storeId, productId);
                    
                        if (product) {
                            const updatedCart = await cartService.addProductToCart(userId, storeId, product);
                            console.log('Produto adicionado. Carrinho atualizado:', updatedCart);
                        } else {
                            console.log('Produto não encontrado.');
                        }
                        break;
                    

                case '3':
                    console.log('--- Remover produto ---');
                    const removeProductId = prompt('Digite o ID do produto a ser removido: ');
                    const cartAfterRemoval = await cartService.removeProductFromCart(userId, storeId, removeProductId);
                    console.log('Produto removido. Carrinho atualizado:', cartAfterRemoval);
                    break;

                case '4':
                    console.log('--- Finalizar compra ---');
                    const checkedOutCart = await cartService.checkoutCart(userId, storeId);
                    console.log('Compra finalizada. Detalhes do carrinho:', checkedOutCart);
                    break;

                case '5':
                    console.log('Saindo do sistema. Até logo!');
                    running = false;
                    break;

                default:
                    console.log('Opção inválida. Tente novamente.');
            }
        } catch (error:any) {
            console.error('Erro:', error.message);
        }
    }
}

// Executa o programa
main().catch(err => {
    console.error('Erro ao executar o sistema:', err.message);
});
