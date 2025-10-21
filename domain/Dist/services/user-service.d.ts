import { User } from "../entities/users/user.js";
export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<User>;
    update(user: User): Promise<User>;
}
//# sourceMappingURL=user-service.d.ts.map