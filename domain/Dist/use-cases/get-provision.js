"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvision = getProvision;
// La función que contiene la lógica
async function getProvision({ dependencies, payload }) {
    const result = await dependencies.provisionService.getByIdd(payload.id);
    if (!result) {
        return new Error('Provision not found');
    }
    return { id: payload.id, title: result?.title, description: result?.description, price: result?.price, clientId: result?.clientId };
}
//# sourceMappingURL=get-provision.js.map