import { v4 as uuidv4 } from 'uuid';
import { UserRoles } from '../../entities/users/user.js';
export class RegisterUserUseCase {
    userRepository;
    encrypter;
    constructor(userRepository, encrypter) {
        this.userRepository = userRepository;
        this.encrypter = encrypter;
    }
    async execute(input) {
        // 1. Desestructuramos para obtener los datos del cliente
        const { name, email, password, contactPhone, companyName } = input;
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email already in use.');
        }
        const hashedPassword = await this.encrypter.hash(input.password);
        // 2. Creamos el objeto User
        const newUser = {
            id: uuidv4(),
            name,
            email,
            passwordHash: hashedPassword,
            role: UserRoles.CLIENT,
            createdAt: new Date(),
        };
        // 3. Preparamos los datos del cliente que el repositorio espera
        const clientData = {
            contactPhone,
            companyName
        };
        // 4. Guardamos el usuario Y el cliente en una sola operación
        // ESTO SOLUCIONA EL ERROR 'Expected 2 arguments, but got 1.'
        // Y SOLUCIONA el error de negocio 'Client profile not found.'
        await this.userRepository.save(newUser, clientData);
        return newUser;
    }
}
//# sourceMappingURL=register-user.use-case.js.map