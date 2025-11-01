import * as bcrypt from 'bcrypt';
const SALT_ROUNDS = 10; // Número de rondas de salting (costo computacional)
export class BcryptEncrypterAdapter {
    // Implementación del método 'hash'
    async hash(value) {
        return bcrypt.hash(value, SALT_ROUNDS);
    }
    // Implementación del método 'compare'
    async compare(plainValue, hashedValue) {
        return bcrypt.compare(plainValue, hashedValue);
    }
}
