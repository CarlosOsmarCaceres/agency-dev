import { Request, Response, NextFunction } from 'express';
import { UserRoles, UserRole } from '../../../../domain/dist/entities/users/user.js';

export const salesMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Autenticación requerida.' });
    }

    // --- 👇 LA LÓGICA CLAVE ESTÁ AQUÍ 👇 ---
    // 1. Definimos los roles permitidos
    const allowedRoles: UserRole[] = [UserRoles.ADMIN, UserRoles.SALESPERSON];

    // 2. Verificamos si el rol del usuario ESTÁ en la lista
    if (!allowedRoles.includes(req.user.role)) {
        // 3. Si NO ESTÁ, devolvemos el error correcto
        return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de Administrador o Vendedor.' });
    }

    // 4. Si es Admin o Vendedor, dejamos pasar
    next();
};