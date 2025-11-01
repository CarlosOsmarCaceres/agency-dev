import { Request, Response } from 'express';
// Importamos la instancia de nuestro caso de uso
import { getUserProfileUseCase } from '../dependencies.js';

export const getUserProfileController = async (req: Request, res: Response) => {
    try {
        // 1. Obtenemos el ID del usuario desde req.user (puesto por el authMiddleware)
        // Usamos '!' (Non-null Assertion) porque este controlador SÓLO debe
        // usarse después del authMiddleware, así que req.user siempre existirá.
        const userId = req.user!.id;

        // 2. Llamamos al caso de uso
        const userProfile = await getUserProfileUseCase.execute({ userId });

        // 3. Enviamos la respuesta exitosa
        return res.status(200).json(userProfile);

    } catch (error) {
        // 4. Manejamos los errores del dominio
        if (error instanceof Error) {
            // Esto podría pasar si el usuario fue eliminado después de que se emitió el token
            if (error.message.includes('User not found')) {
                return res.status(404).json({ error: error.message }); // 404 Not Found
            }
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};