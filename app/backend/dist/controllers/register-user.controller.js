// Importamos la instancia específica de nuestro caso de uso desde el "taller"
import { registerUserUseCase } from '../dependencies.js';
export const registerUserController = async (req, res) => {
    try {
        // 1. Extraemos los datos del body de la petición
        const { name, email, password } = req.body;
        // 2. Validamos la entrada (básico)
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Faltan datos (nombre, email, contraseña).' });
        }
        const input = { name, email, password };
        // 3. Llamamos al caso de uso (la lógica de negocio real)
        const newUser = await registerUserUseCase.execute(input);
        // 4. Enviamos la respuesta exitosa
        // ¡Importante! Omitimos el passwordHash en la respuesta por seguridad.
        const { passwordHash, ...userProfile } = newUser;
        return res.status(201).json(userProfile); // 201 = Creado
    }
    catch (error) {
        // 5. Manejamos los errores que vienen del dominio
        if (error instanceof Error) {
            // Si el email ya existe, nuestro caso de uso lanza un error
            if (error.message.includes('Email already in use')) {
                return res.status(409).json({ error: error.message }); // 409 Conflict
            }
            // Para otros errores del caso de uso
            return res.status(400).json({ error: error.message });
        }
        // Para errores inesperados del servidor
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};
