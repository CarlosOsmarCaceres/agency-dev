import { assignUserToProjectUseCase } from '../dependencies.js';
export const assignUserToProjectController = async (req, res) => {
    try {
        const actingUserId = req.user.id;
        // 1. Obtener el ID del proyecto de los parámetros de la URL
        const { projectId } = req.params;
        // 2. Obtener el ID del usuario a asignar del cuerpo de la petición
        const { userIdToAssign } = req.body;
        if (!projectId || !userIdToAssign) {
            return res.status(400).json({ error: 'El ID del proyecto y el ID del usuario a asignar son requeridos.' });
        }
        const input = {
            actingUserId,
            projectId,
            userIdToAssign
        };
        // 3. Llamamos al caso de uso (verifica permisos, existencia de usuarios y asigna)
        const updatedProject = await assignUserToProjectUseCase.execute(input);
        // 4. Enviamos la respuesta exitosa
        return res.status(200).json(updatedProject);
    }
    catch (error) {
        if (error instanceof Error) {
            // Manejo de errores específicos del dominio
            if (error.message.includes('Authorization failed')) {
                return res.status(403).json({ error: error.message }); // 403 Forbidden
            }
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message }); // 404 Project/User not found
            }
            // Error de negocio: No se puede asignar un Cliente
            if (error.message.includes('Cannot assign a user with Client role')) {
                return res.status(400).json({ error: error.message }); // 400 Bad Request
            }
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};
