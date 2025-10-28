import { InMemoryClientRepository } from "./in-memory-client.repository.js";
export class InMemoryUserRepository {
    users = [];
    async findByClientId(clientId) {
        // En nuestro mock, asumimos que el userId es igual al clientId para simplificar
        // En una implementación real, buscarías en la tabla de Clientes
        const client = (new InMemoryClientRepository()).clients.find(c => c.id === clientId);
        if (!client)
            return null;
        return this.users.find(u => u.id === client.userId) || null;
    }
    async findAll() {
        return this.users;
    }
    async findById(id) {
        return this.users.find(user => user.id === id) || null;
    }
    async findByEmail(email) {
        return this.users.find(user => user.email === email) || null;
    }
    async save(user) {
        this.users.push(user);
        return user;
    }
    async update(user) {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
        }
        return user;
    }
    async delete(id) {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }
}
//# sourceMappingURL=in-memory-user.repository.js.map