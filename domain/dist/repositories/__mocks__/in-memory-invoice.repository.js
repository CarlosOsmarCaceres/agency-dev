export class InMemoryInvoiceRepository {
    invoices = [];
    update(invoice) {
        const index = this.invoices.findIndex(inv => inv.id === invoice.id);
        if (index !== -1) {
            this.invoices[index] = { ...this.invoices[index], ...invoice };
        }
        return Promise.resolve(this.invoices[index]); // Usamos '!' porque asumimos que existe
    }
    async findById(id) {
        return this.invoices.find(inv => inv.id === id) || null;
    }
    async findByClientId(clientId) {
        return this.invoices.filter(inv => inv.clientId === clientId);
    }
    async save(invoice) {
        this.invoices.push(invoice);
        return invoice;
    }
}
//# sourceMappingURL=in-memory-invoice.repository.js.map