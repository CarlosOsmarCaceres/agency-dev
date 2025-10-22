import { describe, it, expect, beforeEach } from 'vitest';
import { GetUserByIdUseCase } from './get-user-by-id.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';


describe('Get User By Id Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let getUserByIdUseCase: GetUserByIdUseCase;
    let adminUser: User, clientUser1: User, clientUser2: User;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        getUserByIdUseCase = new GetUserByIdUseCase(userRepository);

        // Creamos usuarios de prueba
        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        clientUser1 = { id: 'client-1', name: 'John Doe', role: UserRoles.CLIENT, email: 'j@d.com', passwordHash: 'h', createdAt: new Date() };
        clientUser2 = { id: 'client-2', name: 'Jane Doe', role: UserRoles.CLIENT, email: 'j@d.com', passwordHash: 'h', createdAt: new Date() };

        await userRepository.save(adminUser);
        await userRepository.save(clientUser1);
        await userRepository.save(clientUser2);
    });

    it('should allow an admin to get any user profile by ID', async () => {
        const input = {
            actingUserId: 'admin-1',
            targetUserId: 'client-1'
        };

        const profile = await getUserByIdUseCase.execute(input);

        expect(profile).toBeDefined();
        expect(profile.id).toBe('client-1');
        expect(profile.name).toBe('John Doe');
        expect(profile).not.toHaveProperty('passwordHash');
    });

    it('should NOT allow a non-admin user to get another user profile', async () => {
        const input = {
            actingUserId: 'client-2', // Jane intentando ver el perfil de John
            targetUserId: 'client-1'
        };

        await expect(getUserByIdUseCase.execute(input)).rejects.toThrow('Authorization failed: Only administrators can perform this action.');
    });

    it('should throw an error if the target user is not found', async () => {
        const input = {
            actingUserId: 'admin-1',
            targetUserId: 'non-existent-id'
        };

        await expect(getUserByIdUseCase.execute(input)).rejects.toThrow('Target user not found.');
    });
});