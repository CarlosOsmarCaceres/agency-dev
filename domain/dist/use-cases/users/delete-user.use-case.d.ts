import { IUserRepository } from '../../repositories/user-repository.js';
export interface DeleteUserInput {
    actingUserId: string;
    targetUserId: string;
}
export declare class DeleteUserUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(input: DeleteUserInput): Promise<void>;
}
//# sourceMappingURL=delete-user.use-case.d.ts.map