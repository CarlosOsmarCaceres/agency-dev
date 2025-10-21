import { describe, it, expect, beforeEach } from 'vitest';
import { ListUsersUseCase } from './list-users.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { IUserRepository } from '../../repositories/user-repository.js';

// --- Mock del Repositorio ---
// Extendemos el mock con el nuevo método 'findAll'
class InMemoryUserRepository implements IUserRepository {
    public users: User[] = [];
    async findAll(): Promise<User[]> {
        return this.users;
    }
    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }
    async update(user: User): Promise<User> { /* ... */ return user; }
    async findByEmail(email: string): Promise<User | null> { /* ... */ return null; }
    async save(user: User): Promise<User> { this.users.push(user); return user; }
}

describe('List Users Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let listUsersUseCase: ListUsersUseCase;
    let adminUser: User;
    let clientUser: User;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        listUsersUseCase = new ListUsersUseCase(userRepository);

        // Creamos usuarios de prueba
        adminUser = { id: 'admin-1', name: 'Admin', email: 'admin@corp.com', passwordHash: 'hash', role: UserRoles.ADMIN, createdAt: new Date() };
        clientUser = { id: 'client-1', name: 'John Doe', email: 'john@doe.com', passwordHash: 'hash', role: UserRoles.CLIENT, createdAt: new Date() };
        
        await userRepository.save(adminUser);
        await userRepository.save(clientUser);
    });

    it('should allow an admin to list all users', async () => {
        const input = { actingUserId: 'admin-1' };

        const users = await listUsersUseCase.execute(input);

        expect(users).toBeInstanceOf(Array);
        expect(users.length).toBe(2);
        // Verificamos que no se devuelvan los hashes de las contraseñas
        expect(users[0]).not.toHaveProperty('passwordHash');
    });

    it('should NOT allow a non-admin user to list all users', async () => {
        const input = { actingUserId: 'client-1' };

        await expect(listUsersUseCase.execute(input)).rejects.toThrow('Authorization failed: Only administrators can list users.');
    });
    
    it('should return an empty array if no users exist', async () => {
        // Vaciamos el repositorio
        userRepository.users = [adminUser]; // Dejamos solo al admin que hace la consulta
        
        const input = { actingUserId: 'admin-1' };
        
        // Creamos una nueva instancia del caso de uso con el repo vacío (excepto el admin)
        const emptyRepo = new InMemoryUserRepository();
        await emptyRepo.save(adminUser);
        const useCase = new ListUsersUseCase(emptyRepo);

        const users = await useCase.execute(input);
        expect(users.length).toBe(1); // Devuelve solo al propio admin
    });
});