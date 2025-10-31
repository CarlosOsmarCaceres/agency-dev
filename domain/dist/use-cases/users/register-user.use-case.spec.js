import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterUserUseCase } from './register-user.use-case.js';
import { UserRoles } from '../../entities/users/user.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { MockEncrypter } from '../../provider/__mocks__/mock-encrypter.provider.js';
describe('Register User Use Case', () => {
    let userRepository;
    let encrypter;
    let registerUserUseCase;
    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        encrypter = new MockEncrypter();
        registerUserUseCase = new RegisterUserUseCase(userRepository, encrypter);
    });
    it('should create a new user successfully', async () => {
        const input = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
        };
        const result = await registerUserUseCase.execute(input);
        expect(result.id).toBeDefined();
        expect(result.name).toBe('John Doe');
        expect(result.role).toBe(UserRoles.CLIENT); // Verifica que el rol por defecto sea CLIENTE
        expect(userRepository.users.length).toBe(1);
    });
    it('should throw an error if email is already in use', async () => {
        // Primero creamos un usuario
        await registerUserUseCase.execute({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: 'password123',
        });
        // Intentamos registrar otro con el mismo email
        const input = {
            name: 'John Smith',
            email: 'jane.doe@example.com',
            password: 'password456',
        };
        await expect(registerUserUseCase.execute(input)).rejects.toThrow('Email already in use.');
    });
    it('should hash the user password before saving', async () => {
        const input = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'plain_password',
        };
        await registerUserUseCase.execute(input);
        const savedUser = userRepository.users[0]; // Sabemos que existe
        // Comparamos con el hash que genera nuestro MockEncrypter
        expect(savedUser.passwordHash).toBe('hashed_plain_password');
        expect(savedUser.passwordHash).not.toBe('plain_password');
    });
});
//# sourceMappingURL=register-user.use-case.spec.js.map