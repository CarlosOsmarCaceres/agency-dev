import { Client } from "../entities/users/client.js";
export interface IClientRepository {
    findByUserId(userId: string): Promise<Client | null>;
    update(client: Client): Promise<Client>;
}
//# sourceMappingURL=client.repository.d.ts.map