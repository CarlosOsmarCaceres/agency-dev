import { Request, Response } from 'express';
import { deleteUserUseCase } from '../dependencies.js';
import { DeleteUserInput } from '../../../../domain/dist/use-cases/users/delete-user.use-case.js';

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const actingUserId = req.user!.id;
        const { id: targetUserId } = req.params;

        const input: DeleteUserInput = { actingUserId, targetUserId: targetUserId as string };

        await deleteUserUseCase.execute(input);
        
        return res.status(204).send(); // 204 No Content (éxito sin cuerpo)

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