import { Client } from "../../entities/users/client.js";
import { IClientRepository } from "../client.repository.js";
export declare class InMemoryClientRepository implements IClientRepository {
    clients: Client[];
    findByUserId(userId: string): Promise<Client | null>;
    save(client: Client): Promise<Client>;
    update(client: Client): Promise<Client>;
}
//# sourceMappingURL=in-memory-client.repository.d.ts.map