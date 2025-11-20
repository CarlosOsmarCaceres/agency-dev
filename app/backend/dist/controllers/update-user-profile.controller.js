import { updateUserProfileUseCase } from '../dependencies.js';
export const updateUserProfileController = async (req, res) => {
    try {
        const actingUserId = req.user.id;
        // 1. Obtenemos el ID del usuario a modificar de la URL
        // Ruta esperada: PATCH /users/:id
        const { id: targetUserId } = req.params;
        // 2. Obtenemos los datos a actualizar del body
        const { name, contactPhone } = req.body;
        if (!targetUserId) {
            return res.status(400).json({ error: 'El ID del usuario es requerido.' });
        }
        const input = {
            actingUserId,
            targetUserId,
            data: {
                name,
                contactPhone
            }
        };
        // 3. Llamamos al caso de uso
        const updatedUser = await updateUserProfileUseCase.execute(input);
        // 4. Enviamos respuesta (sin passwordHash)
        const { passwordHash, ...userProfile } = updatedUser;
        return res.status(200).json(userProfile);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Authorization failed')) {
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
