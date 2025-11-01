export class MockAuthenticator {
    async generateToken(payload) {
        return `token_for_${payload.id}`;
    }
    async verifyToken(token) {
        // Simulamos un token inválido
        if (token === 'token_invalido') {
            return null;
        }
        // Simulamos un payload decodificado
        return { id: 'mock-id', role: 'CLIENT' };
    }
}
//# sourceMappingURL=mock-authenticator.provider.js.map