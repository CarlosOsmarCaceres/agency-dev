import { IUserRepository } from '../repositories/index.js';
import { IEncrypter } from '../provider/encrypter.provider.js';
import { IAuthenticator } from '../provider/authenticator.provider.js';

// DTO de entrada
export interface LoginInput {
    email: string;
    password: string;
}

export class LoginUseCase {
    constructor(
        private userRepository: IUserRepository,
        private encrypter: IEncrypter,
        private authenticator: IAuthenticator
    ) {}

    async execute(input: LoginInput): Promise<string> {
        // 1. Buscar al usuario por su email
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            throw new Error('Invalid credentials.');
        }

        // 2. Comparar la contraseña proporcionada con el hash guardado
        const isPasswordValid = await this.encrypter.compare(input.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials.');
        }

        // 3. Si todo es correcto, generar y devolver un token
        const token = await this.authenticator.generateToken({
            id: user.id,
            role: user.role,
        });

        return token;
    }
}