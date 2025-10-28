export class MockEncrypter {
    async hash(value) {
        return `hashed_${value}`;
    }
    async compare(plainValue, hashedValue) {
        return `hashed_${plainValue}` === hashedValue;
    }
}
//# sourceMappingURL=mock-encrypter.provider.js.map