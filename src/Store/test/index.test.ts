import { StoreService } from './../service/index.service';
import { StoreDTO } from './../dto/index';
import { User } from './../../User/model/index';
import { FileRepository } from "../../database/FileRepository"; // Importação do repositório de arquivos (mockado para testes)

// Mockando a classe FileRepository para simular seu comportamento durante os testes
jest.mock('../../database/FileRepository');

describe('Store Service', () => {
    let storeService: StoreService;  // Instância do serviço StoreService
    let fileRepoMock: jest.Mocked<FileRepository>;  // Mock do repositório FileRepository

    beforeEach(() => {
        // Inicializa o mock do FileRepository
        fileRepoMock = new FileRepository() as jest.Mocked<FileRepository>;

        // Instância do serviço StoreService
        storeService = new StoreService();
        
        // Configuração do comportamento esperado do mock (simula dados de usuários)
        fileRepoMock.getUsers.mockReturnValue([
            {
                id: '1',
                age: 21,
                password: '240151',
                name: 'John Doe',
                email: 'john.doe@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2',
                age: 30,
                password: 'securePass123',
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);

        // Atribuindo o mock do repositório à instância do StoreService
        storeService['fileRepo'] = fileRepoMock;
    });

    // Teste 1: Criação de loja com sucesso
    it('Deve criar uma loja com sucesso', async () => {
        const ownerId = '1';  // ID do proprietário da loja

        // Dados para a criação de uma nova loja
        const newStoreDto: StoreDTO = {
            name: 'PrismPanel',
            adress: [
                {
                    street: '123 Main St',
                    city: 'Metropolis',
                    state: 'NY',
                    zip: '10101',
                },
            ],
            owner: ownerId,
            openingHours: new Date('2024-01-01T08:00:00'),
            closingTime: new Date('2024-01-01T18:00:00'),
            imageBannerUrl: 'https://example.com/banner.jpg',
            imageLogoUrl: 'https://example.com/logo.jpg',
            employees: [],
            products: [],
            orders: [],
            userCommum: [],
        };

        // Chamada do método de criação de loja e validação do resultado
        const newStore = await storeService.createStore(newStoreDto, ownerId);

        expect(newStore).toBeDefined();  // Verifica se a loja foi criada com sucesso
        expect(newStore.name).toBe('PrismPanel');  // Verifica o nome da loja
        expect(newStore.owner).toBe(ownerId);  // Verifica se o proprietário da loja está correto
        expect(newStore.adress).toEqual([  // Verifica se o endereço da loja está correto
            {
                street: '123 Main St',
                city: 'Metropolis',
                state: 'NY',
                zip: '10101',
            },
        ]);
    });

    // Teste 2: Tentativa de criação de loja com usuário inexistente
    it('Deve lançar erro ao tentar criar loja com usuário inexistente', async () => {
        const invalidOwnerId = '999';  // ID do proprietário inválido

        // Dados para a criação de uma nova loja com proprietário inválido
        const newStoreDto: StoreDTO = {
            name: 'InvalidStore',
            adress: [
                {
                    street: '456 Another St',
                    city: 'Smallville',
                    state: 'KS',
                    zip: '66002',
                },
            ],
            owner: invalidOwnerId,
            openingHours: new Date('2024-01-01T09:00:00'),
            closingTime: new Date('2024-01-01T19:00:00'),
            imageBannerUrl: '',
            imageLogoUrl: '',
            employees: [],
            products: [],
            orders: [],
            userCommum: [],
        };

        // Espera-se que lance um erro: "Usuário não encontrado!"
        await expect(storeService.createStore(newStoreDto, invalidOwnerId)).rejects.toThrow(
            'Usuário não encontrado!'
        );
    });

    // Teste 3: Tentativa de criação de loja com proprietário incorreto
    it('Deve lançar erro ao tentar criar loja com ownerId que não corresponde ao dono especificado', async () => {
        const ownerId = '2';  // ID do proprietário, que não corresponde ao owner declarado no DTO

        // Dados para a criação de uma nova loja com ownerId incorreto
        const newStoreDto: StoreDTO = {
            name: 'MismatchedStore',
            adress: [
                {
                    street: '789 Different St',
                    city: 'Gotham',
                    state: 'NJ',
                    zip: '07030',
                },
            ],
            owner: '1',  // Owner declarado no DTO, mas diferente do ID fornecido
            openingHours: new Date('2024-01-01T10:00:00'),
            closingTime: new Date('2024-01-01T20:00:00'),
            imageBannerUrl: 'https://example.com/different-banner.jpg',
            imageLogoUrl: 'https://example.com/different-logo.jpg',
            employees: [],
            products: [],
            orders: [],
            userCommum: [],
        };

        // Espera-se que lance um erro: "Usuário não autorizado a criar esta loja!"
        await expect(storeService.createStore(newStoreDto, ownerId)).rejects.toThrow(
            'Usuário não autorizado a criar esta loja!'
        );
    });
});
