export class MockAuthenticator {
    async generateToken(payload) {
        return `token_for_${payload.id}`;
    }
}
//# sourceMappingURL=mock-authenticator.provider.js.map