import { describe, it, expect, beforeEach } from 'vitest';
import { UpdateUserProfileUseCase } from './update-user-profile.use-case.js';
import { UserRoles } from '../../entities/users/user.js';
// --- Mocks ---
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryClientRepository } from '../../repositories/__mocks__/in-memory-client.repository.js';
describe('Update User Profile Use Case', () => {
    let userRepository;
    let clientRepository;
    let updateUserProfileUseCase;
    let clientUser, otherClientUser, adminUser;
    let clientProfile;
    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        clientRepository = new InMemoryClientRepository();
        updateUserProfileUseCase = new UpdateUserProfileUseCase(userRepository, clientRepository);
        // Creamos usuarios de prueba
        clientUser = { id: 'client-1', name: 'John Doe', email: 'john@doe.com', passwordHash: 'hash', role: UserRoles.CLIENT, createdAt: new Date() };
        otherClientUser = { id: 'client-2', name: 'Jane Doe', email: 'jane@doe.com', passwordHash: 'hash', role: UserRoles.CLIENT, createdAt: new Date() };
        adminUser = { id: 'admin-1', name: 'Admin', email: 'admin@corp.com', passwordHash: 'hash', role: UserRoles.ADMIN, createdAt: new Date() };
        await userRepository.users.push(clientUser, otherClientUser, adminUser);
        // Creamos un perfil de cliente asociado
        clientProfile = { id: 'profile-1', userId: 'client-1', contactPhone: '111-1111' };
        await clientRepository.clients.push(clientProfile);
    });
    it('should allow a client to update their own profile', async () => {
        const input = {
            actingUserId: 'client-1',
            targetUserId: 'client-1',
            data: { name: 'John D. Smith', contactPhone: '222-2222' }
        };
        const updatedUser = await updateUserProfileUseCase.execute(input);
        const updatedClient = await clientRepository.findByUserId('client-1');
        expect(updatedUser.name).toBe('John D. Smith');
        expect(updatedClient?.contactPhone).toBe('222-2222');
    });
    it('should allow an admin to update another user profile', async () => {
        const input = {
            actingUserId: 'admin-1',
            targetUserId: 'client-1',
            data: { name: 'John Doe (Edited by Admin)' }
        };
        const updatedUser = await updateUserProfileUseCase.execute(input);
        expect(updatedUser.name).toBe('John Doe (Edited by Admin)');
    });
    it('should NOT allow a client to update another user profile', async () => {
        const input = {
            actingUserId: 'client-2', // Jane intentando editar a John
            targetUserId: 'client-1',
            data: { name: 'Hacked Name' }
        };
        await expect(updateUserProfileUseCase.execute(input)).rejects.toThrow('Authorization failed.');
    });
    it('should throw an error if the target user does not exist', async () => {
        const input = {
            actingUserId: 'admin-1',
            targetUserId: 'non-existent-id',
            data: { name: 'Ghost User' }
        };
        await expect(updateUserProfileUseCase.execute(input)).rejects.toThrow('Target user not found.');
    });
});
//# sourceMappingURL=update-user-profile.use-case.spec.js.map