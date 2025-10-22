import { describe, it, expect, beforeEach } from 'vitest';
import { LoginUseCase } from './login.use-cases.js';
import { User, UserRoles } from '../../src/entities/users/user.js';

// --- Mocks ---
import { InMemoryUserRepository } from '../repositories/__mocks__/in-memory-user.repository.js';
import { MockEncrypter } from '../provider/__mocks__/mock-encrypter.provider.js';
import { MockAuthenticator } from '../provider/__mocks__/mock-authenticator.provider.js';

describe('Login Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let encrypter: MockEncrypter;
    let authenticator: MockAuthenticator;
    let loginUseCase: LoginUseCase;

    // El `beforeEach` y el resto de los tests quedan exactamente igual.
    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        encrypter = new MockEncrypter();
        authenticator = new MockAuthenticator();
        loginUseCase = new LoginUseCase(userRepository, encrypter, authenticator);

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