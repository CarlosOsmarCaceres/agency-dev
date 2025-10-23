// Contratos
import { User } from "../../entities/users/user.js";
import { IUserRepository } from "../user-repository.js";
import { InMemoryClientRepository } from "./in-memory-client.repository.js";

export class InMemoryUserRepository implements IUserRepository {
    public users: User[] = [];

    async findByClientId(clientId: string): Promise<User | null> {
        // En nuestro mock, asumimos que el userId es igual al clientId para simplificar
        // En una implementación real, buscarías en la tabla de Clientes
        const client = (new InMemoryClientRepository()).clients.find(c => c.id === clientId);
        if (!client) return null;
        return this.users.find(u => u.id === client.userId) || null;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) || null;
    }
    
    async save(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    async update(user: User): Promise<User> {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
        }
        return user;
    }

    async delete(id: string): Promise<void> { // <-- Añadimos este método al mock
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }

    
}