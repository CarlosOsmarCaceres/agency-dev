export interface IEncrypter {
    hash(value: string): Promise<string>;
    compare(plainValue: string, hashedValue: string): Promise<boolean>;
}
//# sourceMappingURL=encrypter.d.ts.map