// Importação dos módulos e dependências necessários
import promptSync from 'prompt-sync'; // Importa o módulo de captura de entradas do usuário de forma síncrona
import { ProductService } from './service'; // Importa o serviço responsável pela lógica de manipulação de produtos
import { CreateProductDto } from './dtos/create-product-dto'; // Importa o DTO que representa os dados necessários para criar um produto
import { Banner } from '../Promotion/interfaces'; // Importa o tipo para banners de promoções

// Instancia o prompt para captura de entradas no terminal
const prompt = promptSync();

// Função principal assíncrona onde ocorre a lógica de gerenciamento de produtos
async function main() {
    // Cria uma instância do serviço ProductService
    const productService = new ProductService();
    await productService['init']();  // Inicializa o serviço (pode envolver a configuração de banco de dados ou outras configurações)

    console.log('Bem-vindo ao sistema de gerenciamento de produtos!');

    // Variável de controle para manter o loop do menu até que o usuário escolha sair
    let running = true;

    // Loop principal para o menu interativo de opções
    while (running) {
        console.log(`
        Escolha uma opção:
        1. Criar um novo produto
        2. Atualizar produto existente
        3. Excluir produto
        4. Buscar produto por ID
        5. Sair
        `);

        // Captura a opção escolhida pelo usuário
        const option = prompt('Opção: ');

        try {
            // Switch case para manipular as diferentes opções do menu
            switch (option) {
                // Caso 1: Criar um novo produto
                case '1': {
                    console.log('--- Criar um novo produto ---');

                    // Captura os dados do produto do usuário
                    const name = prompt('Digite o nome do produto: ');
                    const price = parseFloat(prompt('Digite o preço do produto: '));
                    const stock = parseInt(prompt('Digite a quantidade em estoque: '));
                    const mark = prompt('Digite a marca do produto: ');
                    const expiryDateString = prompt('Digite a data de validade (ex: 2024-12-31): ');
                    const urlImage = prompt('Digite a URL da imagem do produto: ');
                    const factoryValue = parseFloat(prompt('Digite o preço de fábrica: '));
                    const promotion = prompt('Deseja aplicar uma promoção? (s/n): ') === 's';  // Pergunta se deseja aplicar uma promoção
                    const expiryDate = new Date(expiryDateString); // Converte a string de data em um objeto Date

                    // Se o produto tiver promoção, coleta detalhes adicionais sobre a promoção
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
                            promotionType: (prompt('Digite o tipo da promoção: ')) as "product" | "plan" | "orders",  // Tipo da promoção
                            discountPercentage: parseFloat(prompt('Digite a porcentagem de desconto: ')) // Percentual de desconto
                        }
                        : {}; // Caso não haja promoção, mantém um objeto vazio

                    // Captura os IDs da loja e do proprietário
                    const storeId = prompt('Digite o ID da loja: ');
                    const userId = prompt('Digite o ID do proprietário da loja: ');

                    // Cria o objeto DTO com todos os dados coletados
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
                        ...promotionDetails,  // Inclui detalhes da promoção, se houver
                    };

                    // Chama o método para criar o produto utilizando o ProductService
                    await productService.create(productDto, storeId, userId);
                    break;
                }

                // Caso 2: Atualizar um produto existente
                case '2': {
                    console.log('--- Atualizar produto existente ---');

                    // Captura o ID do produto e os IDs da loja e do proprietário
                    const id = prompt('Digite o ID do produto: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const userId = prompt('Digite o ID do proprietário da loja: ');

                    // Captura os novos dados do produto (deixa vazio para manter os dados atuais)
                    const name = prompt('Novo nome do produto (deixe vazio para manter o atual): ');
                    const price = prompt('Novo preço do produto (deixe vazio para manter o atual): ');
                    const stock = prompt('Nova quantidade em estoque (deixe vazio para manter o atual): ');

                    // Cria o objeto de atualização com os campos informados
                    const updatedProduct = {
                        ...(name && { name }),
                        ...(price && { price: parseFloat(price) }),
                        ...(stock && { stock: parseInt(stock) }),
                    };

                    // Chama o método para atualizar o produto no banco
                    await productService.update(id, storeId, userId, updatedProduct);
                    break;
                }

                // Caso 3: Excluir um produto
                case '3': {
                    console.log('--- Excluir produto ---');

                    // Captura o ID do produto, loja e proprietário
                    const id = prompt('Digite o ID do produto: ');
                    const storeId = prompt('Digite o ID da loja: ');
                    const userId = prompt('Digite o ID do proprietário da loja: ');

                    // Chama o método para excluir o produto
                    await productService.delete(id, storeId, userId);
                    break;
                }

                // Caso 4: Buscar produto por ID
                case '4': {
                    console.log('--- Buscar produto por ID ---');

                    // Captura o ID do produto e chama o método para buscar o produto
                    const id = prompt('Digite o ID do produto: ');
                    const product = await productService.findById(id);

                    // Exibe o produto encontrado ou uma mensagem se não encontrado
                    if (product) {
                        console.log('Produto encontrado:', product);
                    } else {
                        console.log('Produto não encontrado.');
                    }
                    break;
                }

                // Caso 5: Sair do sistema
                case '5':
                    console.log('Saindo do sistema. Até logo!');
                    running = false; // Define a variável para encerrar o loop
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
