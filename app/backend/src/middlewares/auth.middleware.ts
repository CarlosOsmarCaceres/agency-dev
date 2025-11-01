import { Request, Response, NextFunction } from 'express';
// Importamos la instancia de nuestro autenticador (que tiene el método verifyToken)
import { authenticator } from '../dependencies.js';
// Importamos el tipo de lo que guardamos en el token
import { ITokenPayload } from '@agency/domain/providers/authenticator.provider.js';

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
            return res.status(401).json({ error: 'No token provided.' });
        }

        // El formato es "Bearer <token>"
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ error: 'Token format is "Bearer <token>".' });
        }

        const token = parts[1];

        // 2. Verificar el token usando nuestro adaptador
        const payload = await authenticator.verifyToken<ITokenPayload>(token);

        if (!payload) {
            return res.status(401).json({ error: 'Invalid token.' }); // Token inválido o expirado
        }

        // 3. Si el token es válido, adjuntamos el payload (ej. id, role) al objeto 'req'
        // para que los siguientes controladores puedan usarlo.
        req.user = payload;

        // 4. Dejamos que la petición continúe hacia el controlador
        next();

    } catch (error) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
};