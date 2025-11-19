import { Request, Response } from 'express';
// Asegúrate de que esta dependencia ya esté en dependencies.ts
import { updateProjectStatusUseCase } from '../dependencies.js'; 
import { UpdateProjectStatusInput } from '../../../../domain/dist/use-cases/business/update-project-status.use-case.js';

export const updateProjectStatusController = async (req: Request, res: Response) => {
    try {
        const actingUserId = req.user!.id;
        
        // 1. Obtener el ID del proyecto de los parámetros de la URL
        const { projectId } = req.params; 
        
        // 2. Obtener el nuevo estado del cuerpo de la petición
        // El tipo de 'newStatus' será una string (ej. "EN_PROGRESO")
        const { newStatus } = req.body; 

        if (!projectId || !newStatus) {
            return res.status(400).json({ error: 'El ID del proyecto y el nuevo estado son requeridos.' });
        }

        const input: UpdateProjectStatusInput = { 
            actingUserId, 
            projectId,
            newStatus
        };

        // 3. Llamamos al caso de uso (verifica permisos, valida el estado y actualiza)
        const updatedProject = await updateProjectStatusUseCase.execute(input);

        // 4. Enviamos la respuesta exitosa (200 OK porque es una actualización)
        return res.status(200).json(updatedProject);

    } catch (error) {
        if (error instanceof Error) {
            // Manejo de errores específicos del dominio
            if (error.message.includes('Authorization failed')) {
                return res.status(403).json({ error: error.message }); // 403 Forbidden
            }
            if (error.message.includes('Project not found')) {
                return res.status(404).json({ error: error.message }); // 404 Not Found
            }
            if (error.message.includes('Invalid status')) {
                return res.status(400).json({ error: error.message }); // 400 Bad Request
            }
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};