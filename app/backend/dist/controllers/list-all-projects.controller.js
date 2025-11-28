import { listAllProjectsUseCase } from '../dependencies.js';
export const listAllProjectsController = async (req, res) => {
    try {
        const actingUserId = req.user.id;
        const projects = await listAllProjectsUseCase.execute({ actingUserId });
        return res.status(200).json(projects);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Authorization failed'))
                return res.status(403).json({ error: error.message });
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido.' });
    }
};
