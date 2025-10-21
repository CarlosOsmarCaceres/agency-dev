import { IUserRepository } from '../services/user-service.js';
import { IEncrypter } from '../services/encrypter.js';
import { IAuthenticator } from '../services/authenticator.js';
export interface LoginInput {
    email: string;
    password: string;
}
export declare class LoginUseCase {
    private userRepository;
    private encrypter;
    private authenticator;
    constructor(userRepository: IUserRepository, encrypter: IEncrypter, authenticator: IAuthenticator);
    execute(input: LoginInput): Promise<string>;
}
//# sourceMappingURL=login.d.ts.map