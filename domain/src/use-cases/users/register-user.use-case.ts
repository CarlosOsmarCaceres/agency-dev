import { v4 as uuidv4 } from 'uuid';
import { User, UserRoles } from '../../entities/users/user.js';
// Importamos la interfaz del DTO que definimos
import { IUserRepository, SaveUserClientData } from '../../repositories/user-repository.js'; 
import { IEncrypter } from '../../provider/encrypter.provider.js';

// DTO de entrada: AHORA INCLUYE LOS DATOS NECESARIOS PARA CREAR EL CLIENTE
export interface RegisterUserInput {
    name: string;
    email: string;
    password: string;
    contactPhone: string;  // <-- NUEVO CAMPO OBLIGATORIO
    companyName?: string; // <-- NUEVO CAMPO OPCIONAL
}

export class RegisterUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private encrypter: IEncrypter
    ) {}

    async execute(input: RegisterUserInput): Promise<User> {
        // 1. Desestructuramos para obtener los datos del cliente
        const { name, email, password, contactPhone, companyName } = input;

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email already in use.');
        }
        const hashedPassword = await this.encrypter.hash(input.password);

        // 2. Creamos el objeto User
        const newUser: User = {
            id: uuidv4(),
            name,
            email,
            passwordHash: hashedPassword,
            role: UserRoles.CLIENT,
            createdAt: new Date(),
        };
        
        // 3. Preparamos los datos del cliente que el repositorio espera
        const clientData: SaveUserClientData = {
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