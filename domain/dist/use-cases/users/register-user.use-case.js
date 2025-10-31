import { v4 as uuidv4 } from 'uuid';
// Asumiendo alias (ajusta la ruta si sigues con relativas)
import { UserRoles } from '../../entities/users/user.js';
export class RegisterUserUseCase {
    userRepository;
    encrypter;
    constructor(userRepository, encrypter) {
        this.userRepository = userRepository;
        this.encrypter = encrypter;
    }
    async execute(input) {
        // 1. Validar que el email no esté en uso
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser) {
            throw new Error('Email already in use.');
        }
        // 2. Encriptar la contraseña
        const hashedPassword = await this.encrypter.hash(input.password);
        // 3. Crear la nueva entidad User
        const newUser = {
            id: uuidv4(), // Generamos un ID único
            name: input.name,
            email: input.email,
            passwordHash: hashedPassword,
            role: UserRoles.CLIENT, // Por defecto, un nuevo usuario es Cliente
            createdAt: new Date(),
        };
        // 4. Guardar el usuario a través del repositorio
        await this.userRepository.save(newUser);
        return newUser;
    }
}
//# sourceMappingURL=register-user.use-case.js.map