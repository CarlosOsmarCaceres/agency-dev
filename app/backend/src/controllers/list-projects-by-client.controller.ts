import { Request, Response } from 'express';
import { listProjectsByClientUseCase } from '../dependencies.js';
import { ListProjectsByClientInput } from '../../../../domain/dist/use-cases/business/list-projects-by-client.use-case.js';

export const listProjectsByClientController = async (req: Request, res: Response) => {
    try {
        const actingUserId = req.user!.id;
        
        // 1. Obtenemos el clientId de los parámetros de la URL
        // (Ej. /projects/client/client-123)
        const { clientId } = req.params; 

        if (!clientId) {
            return res.status(400).json({ error: 'El ID del cliente (clientId) es requerido.' });
        }

        const input: ListProjectsByClientInput = { actingUserId, clientId };

        // 2. Llamamos al caso de uso
        const projects = await listProjectsByClientUseCase.execute(input);

        // 3. Enviamos la respuesta exitosa
        return res.status(200).json(projects);

    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Authorization failed')) {
                return res.status(403).json({ error: error.message }); // 403 Forbidden
            }
            return res.status(404).json({ error: 'Client or User not found.' }); // Error genérico
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};