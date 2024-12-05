import promptSync from 'prompt-sync';
import { ProductService } from './service';
import { CreateProductDto } from './dtos/create-product-dto';
import { Banner } from '../Promotion/interfaces';

const prompt = promptSync();

async function main() {
    const productService = new ProductService();
    await productService['init'](); // Chamando o método privado init

    console.log('Bem-vindo ao sistema de gerenciamento de produtos!');

    let running = true;

    while (running) {
        console.log(`
        Escolha uma opção:
        1. Criar um novo produto
        2. Atualizar produto existente
        3. Excluir produto
        4. Buscar produto por ID
        5. Sair
        `);

        const option = prompt('Opção: ');

        try {
            switch (option) {
                case '1': {
                    console.log('--- Criar um novo produto ---');
                    const name = prompt('Digite o nome do produto: ');
                    const price = parseFloat(prompt('Digite o preço do produto: '));
                    const stock = parseInt(prompt('Digite a quantidade em estoque: '));
                    const mark = prompt('Digite a marca do produto: ');
                    const expiryDateString = prompt('Digite a data de validade (ex: 2024-12-31): ');
                    const urlImage = prompt('Digite a URL da imagem do produto: ');
                    const factoryValue = parseFloat(prompt('Digite o preço de fábrica: '));
                    const promotion = prompt('Deseja aplicar uma promoção? (s/n): ') === 's';
                    const expiryDate = new Date(expiryDateString);

                    const promotionDetails = promotion
    ? {
        promotionTitle: prompt('Digite o título da promoção: '),
        promotionDescription: prompt('Digite a descrição da promoção: '),
        promotionBanners: [
            {
                url: prompt('Digite a URL do banner da promoção: '),
                altText: prompt('Digite o texto alternativo para o banner: ')  
            }
        ],
        promotionType: (prompt('Digite o tipo da promoção: ')) as "product" | "plan" | "orders",  
        discountPercentage: parseFloat(prompt('Digite a porcentagem de desconto: '))
    }
    : {};



                    const storeId = prompt('Digite o ID da loja: ');
                    const userId = prompt('Digite o ID do proprietário da loja: ');

                    const productDto: CreateProductDto = {
                        name,
                        price,
                        stock,
                        mark,
                        expiryDate,
                        urlImage,
                        factoryValue,
                        storeId,
                        promotion,
                        ...promotionDetails,
                    };

                    await productService.create(productDto, storeId, userId);
                    break;
                }

                case '2': {
                    console.log('--- Atualizar produto existente ---');
                    const id = prompt('Digite o ID do produto: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const userId = prompt('Digite o ID do proprietário da loja: ');

                    const name = prompt('Novo nome do produto (deixe vazio para manter o atual): ');
                    const price = prompt('Novo preço do produto (deixe vazio para manter o atual): ');
                    const stock = prompt(
                        'Nova quantidade em estoque (deixe vazio para manter o atual): '
                    );

                    const updatedProduct = {
                        ...(name && { name }),
                        ...(price && { price: parseFloat(price) }),
                        ...(stock && { stock: parseInt(stock) }),
                    };

                    await productService.update(id, storeId, userId, updatedProduct);
                    break;
                }

                case '3': {
                    console.log('--- Excluir produto ---');
                    const id = prompt('Digite o ID do produto: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const userId = prompt('Digite o ID do proprietário da loja: ');

                    await productService.delete(id, storeId, userId);
                    break;
                }

                case '4': {
                    console.log('--- Buscar produto por ID ---');
                    const id = prompt('Digite o ID do produto: ');
                    const product = productService.findById(id);

                    if (product) {
                        console.log('Produto encontrado:', product);
                    } else {
                        console.log('Produto não encontrado.');
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
