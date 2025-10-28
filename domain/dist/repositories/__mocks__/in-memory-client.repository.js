export class InMemoryClientRepository {
    clients = [];
    async findByUserId(userId) {
        return this.clients.find(c => c.userId === userId) || null;
    }
    async save(client) {
        this.clients.push(client);
        return client;
    }
    async update(client) {
        const index = this.clients.findIndex(c => c.id === client.id);
        if (index !== -1) {
            this.clients[index] = client;
        }
        return client;
    }
}
//# sourceMappingURL=in-memory-client.repository.js.map