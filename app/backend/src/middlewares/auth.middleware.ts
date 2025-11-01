import { Request, Response, NextFunction } from 'express';
// Importamos la instancia de nuestro autenticador (que tiene el método verifyToken)
import { authenticator } from '../dependencies.js';
// Importamos el tipo de lo que guardamos en el token
import { ITokenPayload } from '../../../../domain/dist/provider/authenticator.provider.js';

// Extendemos la interfaz Request de Express para añadir nuestra propiedad 'user'
declare global {
    namespace Express {
        export interface Request {
            user?: ITokenPayload; // Hacemos 'user' opcional en el objeto Request
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Obtener el token del header "Authorization"
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            // Si no hay token, rechazamos
            return res.status(401).json({ error: 'No se proveyó un token.' });
        }

        // El formato estándar es "Bearer <token>"
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ error: 'Formato de token inválido. Debe ser "Bearer <token>".' });
        }

        const token = parts[1];

        // 2. Verificar el token usando nuestro adaptador de JWT
        // Usamos el tipo genérico para que 'payload' sea del tipo ITokenPayload
        const payload = await authenticator.verifyToken<ITokenPayload>(token);

        if (!payload) {
            // Token inválido o expirado
            return res.status(401).json({ error: 'Token inválido.' });
        }

        // 3. Si el token es válido, adjuntamos el payload (ej. id, role) al objeto 'req'
        // para que los siguientes controladores puedan saber "quién" hace la petición.
        req.user = payload;

        // 4. Dejamos que la petición continúe hacia el controlador
        next();

    } catch (error) {
        // Si hay cualquier otro error (ej. token malformado), devolvemos 401
        return res.status(401).json({ error: 'Token inválido.' });
    }
};