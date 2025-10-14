import { describe, expect, test } from 'vitest';
import { getProvision } from './get-provision';
// Aqui es donde vamos a pensar casos de exito y de error, que es lo que esperamo y que no
// import { GetProvisionUseCase } from './get-provision.js';
const dataProvision: [] = [
    {
        id: '1',
        title: 'Sample Provision',  
        description: 'This is a sample provision description.',
        price: 100,
        clientId: 'client-123'
    },
    {
        id: '2',
        title: 'Another Provision',
        description: 'This is another provision description.',
        price: 200,
        clientId: 'client-456'
    },
    {
        id: '3',
        title: 'Third Provision',
        description: 'This is the third provision description.',
        price: 300,
        clientId: 'client-789'
    }
    
]

describe('Get Provision Use Case', async () => {
    const provisionService = {
        getById: async (id: string) => {
            return dataProvision.find((provision) => provision.id == id);
        },
    }; // Mock or implement provisionService as needed
    test('Con un id va a obtener la informacion de un provision', async () => {
        const result = await getProvision({ //getProvision va a recibir las dependencias que necesita y el pyload. si o si o si. Porque nuestro caso de uso siempre va  a depender de una dependencia, pero no siempre un pyloadva a ser necesario.  
            dependencies: { provisionService },
            payload: { id: '1' }
        });

        expect(result).toStrictEqual({
            id: '1',    
            title: 'Sample Provision',
            description: 'This is a sample provision description.',
            price: 100,
            clientId: 'client-123'
        }
        );
        // Aquí puedes agregar tus expectativas, por ejemplo:
        // expect(result).toBeDefined();
    }); 
    test('Con un id invalido deberia devolver un error', async () => {
        // Aquí iría la implementación de la prueba
    }); 
});