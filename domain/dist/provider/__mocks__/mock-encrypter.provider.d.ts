import { IEncrypter } from "../encrypter.provider.js";
export declare class MockEncrypter implements IEncrypter {
    hash(value: string): Promise<string>;
    compare(plainValue: string, hashedValue: string): Promise<boolean>;
}
//# sourceMappingURL=mock-encrypter.provider.d.ts.map