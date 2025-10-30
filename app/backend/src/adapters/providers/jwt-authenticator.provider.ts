import * as jwt from 'jsonwebtoken';
// 👇 CORREGÍ LA RUTA: Usa el alias que configuramos (o la ruta a 'domain/src' si no usas alias)
import { IAuthenticator, ITokenPayload } from '../../../../../domain/dist/provider/authenticator.provider.js';

// --- 👇 LAS CONSTANTES VAN AQUÍ ARRIBA, DENTRO DEL ARCHIVO .TS 👇 ---
// Lee la clave secreta desde el archivo .env
// Si no la encuentra, usa una clave de desarrollo (NO SEGURA para producción)
const JWT_SECRET = process.env.JWT_SECRET || 'tu-secreto-de-desarrollo-muy-seguro';
const JWT_EXPIRES_IN = '1d'; // Cuánto dura el token (ej: 1 día)
// ---

export class JwtAuthenticatorAdapter implements IAuthenticator {
    // Implementación del método 'generateToken'
    async generateToken(payload: ITokenPayload): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload, // Los datos que guardamos (ej. id, role)
                JWT_SECRET, // Usa la constante definida arriba
                { expiresIn: JWT_EXPIRES_IN }, // Usa la constante definida arriba
                (err, token) => {
                    if (err) return reject(err);
                    resolve(token as string);
                }
            );
        });
    }

    // Implementación del método 'verifyToken'
    async verifyToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SECRET, (err, decodedPayload) => {
                if (err) return resolve(null); // Si el token es inválido, devuelve null
                resolve(decodedPayload as T);
            });
        });
    }
}