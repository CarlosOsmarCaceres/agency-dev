import { Request, Response, NextFunction } from 'express';
// Importamos nuestros valores de roles del dominio
import { UserRoles, UserRole } from '../../../../domain/dist/entities/users/user.js';

export const salesMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // 1. Asumimos que authMiddleware ya se ejecutó y pobló req.user
    if (!req.user) {
        return res.status(401).json({ error: 'Autenticación requerida.' });
    }

    // 2. Definimos los roles permitidos para esta acción
    const allowedRoles: UserRole[] = [UserRoles.ADMIN, UserRoles.SALESPERSON];

    // 3. Verificamos si el rol del usuario está en la lista de permitidos
    if (!allowedRoles.includes(req.user.role)) {
        // 403 Forbidden: Estás autenticado, pero no tienes permiso.
        return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de Administrador o Vendedor.' });
    }

    // 4. Si tiene permiso (Admin o Sales), dejamos pasar
    next();
};