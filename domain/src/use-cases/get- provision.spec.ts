// Aqui es donde vamos a pensar casos de exito y de error, que es lo que esperamo y que 
import { describe, expect, test } from 'vitest';
import { getProvision } from './get-provision';
import { Provision, Provision as ProvisionEntity } from '../entities';
                                             
/* type Provision = {
    id: string;
    title: string;
    description: string;                                                     
    price: number;
    clientId: string;
}; */

const dataProvision: Provision[] = [
    {
        id: '1',
        title: 'Sample Provision',  
        description: 'This is a sample provision description.',
        price: 100,
        clientId: '1'
    },
    {
        id: '2',
        title: 'Another Provision',
        description: 'This is another provision description.',
        price: 200,
        clientId: '1'
    },
    {
        id: '3',
        title: 'Third Provision',
        description: 'This is the third provision description.',
        price: 300,
        clientId: '1'
    }   
]

describe('Get Provision Use Case', async () => {
    // 1. Creación de un "Mock" o "Doble de Prueba"
    const provisionService = {
        getByIdd: async (id: string) => {
            return dataProvision.find((provisionn) => provisionn.id == id);
        },
    };

    // 2. Test del caso de éxito
    test('Con un id va a obtener la informacion de un provision', async () => {
        // 3. Ejecución del caso de uso
        const result = await getProvision({ 
            dependencies: { provisionService }, // 4. Inyección de la dependencia
            payload: { id: '1', title: 'Sample Provision', description: 'This is a sample provision description.', price: 100, clientId: '1' }
        });
        
        // 5. Verificación (Assertion)
        expect(result).toStrictEqual({
            id: '1',
            title: 'Sample Provision',
            description: 'This is a sample provision description.',
            price: 100,
            clientId: '1'
        });
    }); 
    
    // 6. Test del caso de error (pendiente)
    test('Con un id invalido deberia devolver un error', async () => {
        // Aquí iría la lógica para probar qué pasa si el id no existe
    }); 
});