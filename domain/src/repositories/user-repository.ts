import { User } from "../entities/users/user.js";


export interface SaveUserClientData {
    contactPhone: string;
    companyName?: string | undefined;
}

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    // 👇 MODIFICAMOS LA FIRMA DE 'SAVE' 👇
    save(user: User, clientData: SaveUserClientData): Promise<User>; 
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;
    findByClientId(clientId: string): Promise<User | null>;
}