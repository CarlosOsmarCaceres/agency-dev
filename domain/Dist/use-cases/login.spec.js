import { describe, it, expect, beforeEach } from 'vitest';
import { LoginUseCase } from './login.js';
import { UserRoles } from '../entities/users/user.js';
// --- Mocks ---
// Usaremos los mismos mocks de antes, pero con pequeñas adaptaciones.
class InMemoryUserRepository {
    findById(id) {
        throw new Error('Method not implemented.');
    }
    update(user) {
        throw new Error('Method not implemented.');
    }
    users = [];
    async findByEmail(email) {
        return this.users.find(user => user.email === email) || null;
    }
    async save(user) {
        this.users.push(user);
        return user;
    }
}
class MockEncrypter {
    async hash(value) {
        return `hashed_${value}`;
    }
    async compare(value, hash) {
        // Simulamos que la contraseña es correcta si coincide con el hash esperado
        return `hashed_${value}` === hash;
    }
}
class MockAuthenticator {
    async generateToken(payload) {
        return `token_for_${payload.id}`;
    }
}
describe('Login Use Case', () => {
    let userRepository;
    let encrypter;
    let authenticator;
    let loginUseCase;
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
//# sourceMappingURL=login.spec.js.map