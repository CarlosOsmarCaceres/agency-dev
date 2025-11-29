import { getUserByIdUseCase } from '../dependencies.js';
export const getUserByIdController = async (req, res) => {
    try {
        const actingUserId = req.user.id;
        const { id: targetUserId } = req.params;
        const input = { actingUserId, targetUserId: targetUserId };
        const user = await getUserByIdUseCase.execute(input);
        return res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Authorization failed'))
                return res.status(403).json({ error: error.message });
            if (error.message.includes('not found'))
                return res.status(404).json({ error: error.message });
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido.' });
    }
};
