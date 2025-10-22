import { describe, it, expect, beforeEach } from 'vitest';
import { DeleteUserUseCase } from './delete-user.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';


describe('Delete User Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let deleteUserUseCase: DeleteUserUseCase;
    let adminUser: User, clientUser: User;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        deleteUserUseCase = new DeleteUserUseCase(userRepository);

        // Creamos usuarios de prueba
        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        clientUser = { id: 'client-1', name: 'John Doe', role: UserRoles.CLIENT, email: 'j@d.com', passwordHash: 'h', createdAt: new Date() };

        await userRepository.save(adminUser);
        await userRepository.save(clientUser);
    });

    it('should allow an admin to delete another user', async () => {
        const input = {
            actingUserId: 'admin-1',
            targetUserId: 'client-1'
        };

        await deleteUserUseCase.execute(input);

        const deletedUser = await userRepository.findById('client-1');
        expect(deletedUser).toBeNull();
        expect(userRepository.users.length).toBe(1);
    });

    it('should NOT allow a non-admin to delete a user', async () => {
        const input = {
            actingUserId: 'client-1',
            targetUserId: 'admin-1'
        };

        await expect(deleteUserUseCase.execute(input)).rejects.toThrow('Authorization failed: Only administrators can delete users.');
    });

    it('should NOT allow an admin to delete themselves', async () => {
        const input = {
            actingUserId: 'admin-1',
            targetUserId: 'admin-1'
        };

        await expect(deleteUserUseCase.execute(input)).rejects.toThrow('Action forbidden: Administrators cannot delete themselves.');
    });

    it('should throw an error if the target user does not exist', async () => {
        const input = {
            actingUserId: 'admin-1',
            targetUserId: 'non-existent-id'
        };

        await expect(deleteUserUseCase.execute(input)).rejects.toThrow('Target user not found.');
    });
});