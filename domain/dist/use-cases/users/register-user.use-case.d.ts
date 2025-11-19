import { User } from '../../entities/users/user.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { IEncrypter } from '../../provider/encrypter.provider.js';
export interface RegisterUserInput {
    name: string;
    email: string;
    password: string;
    contactPhone: string;
    companyName?: string;
}
export declare class RegisterUserUseCase {
    private userRepository;
    private encrypter;
    constructor(userRepository: IUserRepository, encrypter: IEncrypter);
    execute(input: RegisterUserInput): Promise<User>;
}
//# sourceMappingURL=register-user.use-case.d.ts.map