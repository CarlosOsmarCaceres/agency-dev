import { describe, it, expect, beforeEach } from 'vitest';
import { UpdateUserRoleUseCase } from './update-user-role.use-case.js';
import { UserRoles } from '../../entities/users/user.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
// --- Mock del Repositorio ---
/* class InMemoryUserRepository implements IUserRepository {
    public users: User[] = [];
    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }
    async update(user: User): Promise<User> {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) this.users[index] = user;
        return user;
    }
    // Métodos no usados en este test
    async findAll(): Promise<User[]> { return this.users; }
    async findByEmail(email: string): Promise<User | null> { return null; }
    async save(user: User): Promise<User> { this.users.push(user); return user; }
} */
describe('Update User Role Use Case', () => {
    let userRepository;
    let updateUserRoleUseCase;
    let adminUser, clientUser;
    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        updateUserRoleUseCase = new UpdateUserRoleUseCase(userRepository);
        // Creamos usuarios de prueba
        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        clientUser = { id: 'client-1', name: 'John Doe', role: UserRoles.CLIENT, email: 'j@d.com', passwordHash: 'h', createdAt: new Date() };
        await userRepository.save(adminUser);
        await userRepository.save(clientUser);
    });
    it('should allow an admin to change another user role', async () => {
        const input = {
            actingUserId: 'admin-1',
            targetUserId: 'client-1',
            newRole: UserRoles.SALESPERSON
        };
        const updatedUser = await updateUserRoleUseCase.execute(input);
        expect(updatedUser.role).toBe(UserRoles.SALESPERSON);
    });
    it('should NOT allow a non-admin to change a user role', async () => {
        const input = {
            actingUserId: 'client-1',
            targetUserId: 'admin-1',
            newRole: UserRoles.CLIENT
        };
        await expect(updateUserRoleUseCase.execute(input)).rejects.toThrow('Authorization failed: Only administrators can change user roles.');
    });
    it('should NOT allow an admin to change their own role', async () => {
        const input = {
            actingUserId: 'admin-1',
            targetUserId: 'admin-1',
            newRole: UserRoles.CLIENT
        };
        await expect(updateUserRoleUseCase.execute(input)).rejects.toThrow('Action forbidden: Administrators cannot change their own role.');
    });
    it('should throw an error if the target user is not found', async () => {
        const input = {
            actingUserId: 'admin-1',
            targetUserId: 'non-existent-id',
            newRole: UserRoles.CLIENT
        };
        await expect(updateUserRoleUseCase.execute(input)).rejects.toThrow('Target user not found.');
    });
});
//# sourceMappingURL=update-user-role.use-case.spec.js.map