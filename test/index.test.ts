import { StoreService } from './../src/Store/service/index.service';
import { StoreDTO } from './../src/Store/dto/index';
import { User } from './../src/User/model/index';

// CONFIGURAÇÃO
describe('Store Service', () => {
    let storeService: StoreService;

    // CONFIGURAÇÃO
    beforeEach(() => {
        storeService = new StoreService();

        // CONFIGURAÇÃO: Mock de usuários
        const mockUser: User = {
            id: '1',
            age: 21,
            password: '240151',
            name: 'John Doe',
            email: 'john.doe@example.com',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const anotherMockUser: User = {
            id: '2',
            age: 30,
            password: 'securePass123',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Adicionando usuários ao serviço
        (storeService as any).users.push(mockUser, anotherMockUser);
    });

    it('Deve criar uma loja com sucesso', async () => {
        // CONFIGURAÇÃO
        const ownerId = '1';

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
        };

        // AÇÃO
        const newStore = await storeService.createStore(newStoreDto, ownerId);

        // VERIFICAÇÃO
        expect(newStore).toBeDefined();
        expect(newStore.name).toBe('PrismPanel');
        expect(newStore.owner).toBe(ownerId);
        expect(newStore.adress).toEqual([
            {
                street: '123 Main St',
                city: 'Metropolis',
                state: 'NY',
                zip: '10101',
            },
        ]);
    });

    it('Deve lançar erro ao tentar criar loja com usuário inexistente', async () => {
        // CONFIGURAÇÃO
        const invalidOwnerId = '999';

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
        };

        // VERIFICAÇÃO
        await expect(storeService.createStore(newStoreDto, invalidOwnerId)).rejects.toThrow(
            'Usuário não encontrado!'
        );
    });

    it('Deve lançar erro ao tentar criar loja com ownerId que não corresponde ao dono especificado', async () => {
        // CONFIGURAÇÃO
        const ownerId = '2'; 

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
            owner: '1', // O `owner` declarado não corresponde ao `ownerId` passado
            openingHours: new Date('2024-01-01T10:00:00'),
            closingTime: new Date('2024-01-01T20:00:00'),
            imageBannerUrl: 'https://example.com/different-banner.jpg',
            imageLogoUrl: 'https://example.com/different-logo.jpg',
            employees: [],
            products: [],
        };

        // VERIFICAÇÃO
        await expect(storeService.createStore(newStoreDto, ownerId)).rejects.toThrow(
            'Usuário não autorizado a criar esta loja!'
        );
    });
});
