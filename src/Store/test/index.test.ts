import { StoreService } from './../service/index.service';
import { StoreDTO } from './../dto/index';
import { User } from './../../User/model/index';
import { FileRepository } from "../../database/FileRepository"; // Import FileRepository

// Mocking FileRepository
jest.mock('../../database/FileRepository');

describe('Store Service', () => {
    let storeService: StoreService;
    let fileRepoMock: jest.Mocked<FileRepository>;

    beforeEach(() => {
        // Initialize the StoreService instance
        fileRepoMock = new FileRepository() as jest.Mocked<FileRepository>;
        storeService = new StoreService();
        
        // Mock getUsers to return an array of users
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

        // Assign the mocked fileRepo to the storeService instance
        storeService['fileRepo'] = fileRepoMock;
    });

    it('Deve criar uma loja com sucesso', async () => {
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
            orders: [],
            userCommum: [],
        };

        // Simulate the createStore method
        const newStore = await storeService.createStore(newStoreDto, ownerId);

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
            orders: [],
            userCommum: [],
        };

        // Expecting the error "Usuário não encontrado!"
        await expect(storeService.createStore(newStoreDto, invalidOwnerId)).rejects.toThrow(
            'Usuário não encontrado!'
        );
    });

    it('Deve lançar erro ao tentar criar loja com ownerId que não corresponde ao dono especificado', async () => {
        const ownerId = '2'; // This should be mismatched with the owner in the DTO

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
            owner: '1', // The owner declared doesn't match the ownerId passed
            openingHours: new Date('2024-01-01T10:00:00'),
            closingTime: new Date('2024-01-01T20:00:00'),
            imageBannerUrl: 'https://example.com/different-banner.jpg',
            imageLogoUrl: 'https://example.com/different-logo.jpg',
            employees: [],
            products: [],
            orders: [],
            userCommum: [],
        };

        // Expecting the error "Usuário não autorizado a criar esta loja!"
        await expect(storeService.createStore(newStoreDto, ownerId)).rejects.toThrow(
            'Usuário não autorizado a criar esta loja!'
        );
    });
});
