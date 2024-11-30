import { ProductService } from "../service/index" 

describe('ProductService', () => {
    let productService: ProductService;

    // Configuração (Arrange)
    beforeEach(() => {
        productService = new ProductService(); // Preparação para cada teste
    });

    // Configuração (Process configuration create product)
    test('deve criar um novo produto com sucesso', () => {
        const newProductDto = {
            name: 'Product 1',
            price: 100,
            stock: 50,
            mark: 'BrandX',
            storeId: 'Store1',
            expiryDate: new Date(),
            urlImage: 'http://example.com/image.jpg',
            factoryValue: 80,
            promotion: false,
        };
        
        // Ação: Criando o produto
        productService.create(newProductDto); 

        // Verificação (Assert)
        const createdProductId = productService['products'][0].id;  // Obtendo ID do produto criado
        const createdProduct = productService.findById(createdProductId); // Buscando produto criado
        
        expect(createdProduct).toBeTruthy();  // Verificando se o produto existe
        expect(createdProduct?.name).toBe('Product 1');  // Verificando nome
        expect(createdProduct?.price).toBe(100);  // Verificando preço
    });
});
