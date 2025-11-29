import { Request, Response } from 'express';
import { updateUserRoleUseCase } from '../dependencies.js';
import { UpdateUserRoleInput } from '../../../../domain/dist/use-cases/users/update-user-role.use-case.js';
import { UserRole } from '../../../../domain/dist/entities/users/user.js';

export const updateUserRoleController = async (req: Request, res: Response) => {
    try {
        const actingUserId = req.user!.id;
        const { id: targetUserId } = req.params;
        const { newRole } = req.body;

        if (!newRole) {
            return res.status(400).json({ error: 'El nuevo rol (newRole) es requerido.' });
        }

        const input: UpdateUserRoleInput = {
            actingUserId,
            targetUserId: targetUserId as string,
            newRole: newRole as UserRole // El caso de uso validará si es un rol válido
        };

        const updatedUser = await updateUserRoleUseCase.execute(input);
        
        // Limpiamos el hash antes de devolver
        const { passwordHash, ...userProfile } = updatedUser;
        return res.status(200).json(userProfile);

    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Authorization failed') || error.message.includes('Action forbidden')) {
                return res.status(403).json({ error: error.message });
            }
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido.' });
    }
};