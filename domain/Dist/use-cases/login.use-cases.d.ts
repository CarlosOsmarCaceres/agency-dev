import { IUserRepository } from '../repositories/index.js';
import { IEncrypter } from '../provider/encrypter.provider.js';
import { IAuthenticator } from '../provider/authenticator.provider.js';
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
//# sourceMappingURL=login.use-cases.d.ts.map