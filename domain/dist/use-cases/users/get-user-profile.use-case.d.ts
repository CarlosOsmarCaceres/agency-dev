import { IUserRepository } from '../../repositories/user-repository.js';
import { User } from '../../entities/users/user.js';
export interface GetUserProfileInput {
    userId: string;
}
type UserProfile = Omit<User, 'passwordHash'>;
export declare class GetUserProfileUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(input: GetUserProfileInput): Promise<UserProfile>;
}
export {};
//# sourceMappingURL=get-user-profile.use-case.d.ts.map