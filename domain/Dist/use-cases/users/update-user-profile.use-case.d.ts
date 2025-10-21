import { IUserRepository } from '../../repositories/user.repository';
import { IClientRepository } from '../../repositories/client.repository';
import { User } from '../../entities/users/user.entity';
export interface UpdateUserProfileInput {
    actingUserId: string;
    targetUserId: string;
    data: {
        name?: string;
        contactPhone?: string;
    };
}
export declare class UpdateUserProfileUseCase {
    private userRepository;
    private clientRepository;
    constructor(userRepository: IUserRepository, clientRepository: IClientRepository);
    execute(input: UpdateUserProfileInput): Promise<User>;
}
//# sourceMappingURL=update-user-profile.use-case.d.ts.map