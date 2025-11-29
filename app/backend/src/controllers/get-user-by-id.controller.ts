import { Request, Response } from 'express';
import { getUserByIdUseCase } from '../dependencies.js';
import { GetUserByIdInput } from '../../../../domain/dist/use-cases/users/get-user-by-id.use-case.js';

export const getUserByIdController = async (req: Request, res: Response) => {
    try {
        const actingUserId = req.user!.id;
        const { id: targetUserId } = req.params;

        const input: GetUserByIdInput = { actingUserId, targetUserId: targetUserId as string };
        
        const user = await getUserByIdUseCase.execute(input);
        
        return res.status(200).json(user);

    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Authorization failed')) return res.status(403).json({ error: error.message });
            if (error.message.includes('not found')) return res.status(404).json({ error: error.message });
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido.' });
    }
};