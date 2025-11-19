// Asegúrate de que esta dependencia ya esté en dependencies.ts
import { getProjectDetailsUseCase } from '../dependencies.js';
export const getProjectDetailsController = async (req, res) => {
    try {
        const actingUserId = req.user.id;
        // 1. Obtener el ID del proyecto de los parámetros de la URL
        const { projectId } = req.params;
        if (!projectId) {
            return res.status(400).json({ error: 'El ID del proyecto (projectId) es requerido.' });
        }
        const input = {
            actingUserId,
            projectId
        };
        // 2. Llamamos al caso de uso (verifica permisos y busca)
        // El caso de uso devuelve el proyecto con sus detalles de servicio.
        const projectDetails = await getProjectDetailsUseCase.execute(input);
        // 3. Enviamos la respuesta exitosa
        return res.status(200).json(projectDetails);
    }
    catch (error) {
        if (error instanceof Error) {
            // Manejo de errores específicos del dominio
            if (error.message.includes('Authorization failed')) {
                return res.status(403).json({ error: error.message }); // 403 Forbidden
            }
            if (error.message.includes('Project not found')) {
                return res.status(404).json({ error: error.message }); // 404 Not Found
            }
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};
