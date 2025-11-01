import { Request, Response } from 'express';
// Importamos la instancia de nuestro caso de uso
import { loginUseCase } from '../dependencies.js';
// Importamos el DTO de entrada
import { LoginInput } from '../../../../domain/dist/use-cases/login.use-cases.js';

export const loginController = async (req: Request, res: Response) => {
    try {
        // 1. Extraemos los datos del body
        const { email, password } = req.body;

        // 2. Validamos la entrada (básico)
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
        }

        const input: LoginInput = { email, password };

        // 3. Llamamos al caso de uso
        const token = await loginUseCase.execute(input);

        // 4. Enviamos la respuesta exitosa (el token)
        return res.status(200).json({ token });

    } catch (error) {
        // 5. Manejamos los errores del dominio
        if (error instanceof Error) {
            // Si las credenciales son inválidas, nuestro caso de uso lanza este error
            if (error.message.includes('Invalid credentials')) {
                return res.status(401).json({ error: error.message }); // 401 Unauthorized
            }
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};