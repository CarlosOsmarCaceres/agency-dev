import { describe, it, expect, beforeEach } from 'vitest';
import { GetUserProfileUseCase } from './get-user-profile.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';

describe('Get User Profile Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let getUserProfileUseCase: GetUserProfileUseCase;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        getUserProfileUseCase = new GetUserProfileUseCase(userRepository);

        // Creamos un usuario de prueba
        await userRepository.save({
            id: 'user-123',
            name: 'John Doe',
            email: 'john.doe@example.com',
            passwordHash: 'a_very_secret_hash',
            role: UserRoles.CLIENT,
            createdAt: new Date(),
        });
    });

    it('should return user profile data for a valid user ID', async () => {
        const input = { userId: 'user-123' };
        const profile = await getUserProfileUseCase.execute(input);

        expect(profile).toBeDefined();
        expect(profile.id).toBe('user-123');
        expect(profile.name).toBe('John Doe');
    });
    
    it('should NOT return the password hash', async () => {
        const input = { userId: 'user-123' };
        const profile = await getUserProfileUseCase.execute(input);

        // Verificamos que la propiedad passwordHash no exista en el objeto devuelto
        expect(profile).not.toHaveProperty('passwordHash');
    });

    it('should throw an error if the user does not exist', async () => {
        const input = { userId: 'non-existent-id' };

        await expect(getUserProfileUseCase.execute(input)).rejects.toThrow('User not found.');
    });
});