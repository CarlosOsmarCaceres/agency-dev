import { describe, it, expect, beforeEach } from 'vitest';
import { LoginUseCase } from './login.use-cases.js';
import { IUserRepository } from '../repositories/user-repository.js';
import { IEncrypter } from '../provider/encrypter.provider.js';
import { IAuthenticator } from '../provider/authenticator.provider.js';
import { User, UserRole, UserRoles } from '../entities/users/user.js';
// --- Mocks ---
// Usaremos los mismos mocks de antes, pero con pequeñas adaptaciones.
class InMemoryUserRepository implements IUserRepository {
    findById(id: string): Promise<User | null> {
        throw new Error('Method not implemented.');
    }
    update(user: User): Promise<User> {
        throw new Error('Method not implemented.');
    }
    public users: User[] = [];
    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) || null;
    }
    async save(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }
}

class MockEncrypter implements IEncrypter {
    async hash(value: string): Promise<string> {
        return `hashed_${value}`;
    }
    async compare(value: string, hash: string): Promise<boolean> {
        // Simulamos que la contraseña es correcta si coincide con el hash esperado
        return `hashed_${value}` === hash;
    }
}

class MockAuthenticator implements IAuthenticator {
    async generateToken(payload: { id: string; role: UserRole; }): Promise<string> {
        return `token_for_${payload.id}`;
    }
}


describe('Login Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let encrypter: MockEncrypter;
    let authenticator: MockAuthenticator;
    let loginUseCase: LoginUseCase;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        encrypter = new MockEncrypter();
        authenticator = new MockAuthenticator();
        loginUseCase = new LoginUseCase(userRepository, encrypter, authenticator);

        // Creamos un usuario de prueba antes de cada test
        await userRepository.save({
            id: '123',
            name: 'Test User',
            email: 'test@example.com',
            passwordHash: 'hashed_correct_password',
            role: UserRoles.CLIENT,
            createdAt: new Date(),
        });
    });

    it('Login1 - should authenticate the user and return a token on successful login', async () => {
        const input = {
            email: 'test@example.com',
            password: 'correct_password',
        };

        const token = await loginUseCase.execute(input);
        
        expect(token).toBe('token_for_123');
    });

    it('Login2 - should throw an error for an incorrect password', async () => {
        const input = {
            email: 'test@example.com',
            password: 'wrong_password',
        };

        await expect(loginUseCase.execute(input)).rejects.toThrow('Invalid credentials.');
    });

    it('Login3 - should throw an error if the user does not exist', async () => {
        const input = {
            email: 'nonexistent@example.com',
            password: 'any_password',
        };

        await expect(loginUseCase.execute(input)).rejects.toThrow('Invalid credentials.');
    });
});