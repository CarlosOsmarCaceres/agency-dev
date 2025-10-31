// Asumiendo alias (ajusta la ruta si sigues con relativas)
import { IUserRepository } from '../../repositories/user-repository.js';
import { User } from '../../entities/users/user.js';

// DTO de entrada: solo necesitamos el ID del usuario
export interface GetUserProfileInput {
    userId: string;
}

// DTO de salida: definimos la "forma" de los datos que devolvemos
// Omitimos 'passwordHash' del tipo User para mayor seguridad
type UserProfile = Omit<User, 'passwordHash'>;

export class GetUserProfileUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(input: GetUserProfileInput): Promise<UserProfile> {
        const user = await this.userRepository.findById(input.userId);

        if (!user) {
            throw new Error('User not found.');
        }

        // Creamos un nuevo objeto para asegurarnos de no devolver el hash por accidente
        const userProfile: UserProfile = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };

        return userProfile;
    }
}