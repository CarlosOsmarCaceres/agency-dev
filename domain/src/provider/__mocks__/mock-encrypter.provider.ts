import { IEncrypter } from "../encrypter.provider.js";

export class MockEncrypter implements IEncrypter {
    async hash(value: string): Promise<string> {
        return `hashed_${value}`;
    }
    async compare(plainValue: string, hashedValue: string): Promise<boolean> {
        return `hashed_${plainValue}` === hashedValue;
    }
}