import { IUserRepository } from '../../repositories/user-repository.js';
import { User } from '../../entities/users/user.js';
export interface GetUserByIdInput {
    actingUserId: string;
    targetUserId: string;
}
type UserProfile = Omit<User, 'passwordHash'>;
export declare class GetUserByIdUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(input: GetUserByIdInput): Promise<UserProfile>;
}
export {};
//# sourceMappingURL=get-user-by-id.use-case.d.ts.map