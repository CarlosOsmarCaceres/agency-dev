import { IUserRepository } from '../../repositories/user-repository.js';
import { User, UserRole } from '../../entities/users/user.js';
export interface UpdateUserRoleInput {
    actingUserId: string;
    targetUserId: string;
    newRole: UserRole;
}
export declare class UpdateUserRoleUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(input: UpdateUserRoleInput): Promise<User>;
}
//# sourceMappingURL=update-user-role.use-case.d.ts.map