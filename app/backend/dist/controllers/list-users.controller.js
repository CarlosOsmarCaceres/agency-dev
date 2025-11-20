import { listUsersUseCase } from '../dependencies.js';
export const listUsersController = async (req, res) => {
    try {
        const actingUserId = req.user.id;
        // Solo necesitamos pasar el ID del actor para verificar permisos
        const users = await listUsersUseCase.execute({ actingUserId });
        return res.status(200).json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Authorization failed')) {
                return res.status(403).json({ error: error.message });
            }
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido.' });
    }
};
