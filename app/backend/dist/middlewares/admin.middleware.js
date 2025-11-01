// Importamos nuestros valores de roles del dominio
import { UserRoles } from '../../../../domain/dist/entities/users/user.js';
export const adminMiddleware = (req, res, next) => {
    // 1. Asumimos que authMiddleware ya se ejecutó y pobló req.user
    if (!req.user) {
        // Esto no debería pasar si authMiddleware se usó primero, pero es una buena defensa
        return res.status(401).json({ error: 'Autenticación requerida.' });
    }
    // 2. Verificamos el rol del usuario
    if (req.user.role !== UserRoles.ADMIN) {
        // 403 Forbidden: Estás autenticado, pero no tienes permiso para este recurso
        return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de Administrador .' });
    }
    // 3. Si es Admin, dejamos pasar
    next();
};
