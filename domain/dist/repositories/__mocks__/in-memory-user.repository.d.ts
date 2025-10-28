import { User } from "../../entities/users/user.js";
import { IUserRepository } from "../user-repository.js";
export declare class InMemoryUserRepository implements IUserRepository {
    users: User[];
    findByClientId(clientId: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=in-memory-user.repository.d.ts.map