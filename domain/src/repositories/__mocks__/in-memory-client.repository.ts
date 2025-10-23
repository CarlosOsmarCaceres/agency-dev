// Contratos
import { Client } from "../../entities/users/client.js";
import { IClientRepository } from "../client.repository.js";

export class InMemoryClientRepository implements IClientRepository {
    public clients: Client[] = [];

    async findByUserId(userId: string): Promise<Client | null> {
        return this.clients.find(c => c.userId === userId) || null;
    }

    async save(client: Client): Promise<Client> {
            this.clients.push(client);
            return client;
        }
    
    async update(client: Client): Promise<Client> {
        const index = this.clients.findIndex(c => c.id === client.id);
        if (index !== -1) {
            this.clients[index] = client;
        }
        return client;
    }
}