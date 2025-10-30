// Usamos alias (si ya están) o rutas relativas
import { IEncrypter } from '../../../../../domain/dist//provider/encrypter.provider.js';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Número de rondas de salting (costo computacional)

export class BcryptEncrypterAdapter implements IEncrypter {
    // Implementación del método 'hash'
    async hash(value: string): Promise<string> {
        return bcrypt.hash(value, SALT_ROUNDS);
    }

    // Implementación del método 'compare'
    async compare(plainValue: string, hashedValue: string): Promise<boolean> {
        return bcrypt.compare(plainValue, hashedValue);
    }
}