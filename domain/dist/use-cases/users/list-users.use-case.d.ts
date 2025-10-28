import { IUserRepository } from '../../repositories/user-repository.js';
import { User } from '../../entities/users/user.js';
export interface ListUsersInput {
    actingUserId: string;
}
type UserProfile = Omit<User, 'passwordHash'>;
export declare class ListUsersUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(input: ListUsersInput): Promise<UserProfile[]>;
}
export {};
//# sourceMappingURL=list-users.use-case.d.ts.map