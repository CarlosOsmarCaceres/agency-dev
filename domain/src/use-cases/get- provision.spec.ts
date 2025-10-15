// Aqui es donde vamos a pensar casos de exito y de error, que es lo que esperamo y que 
import { describe, expect, test } from 'vitest';
import { getProvision } from './get-provision';
type Provision = {
    id: string;
    title: string;
    description: string;
    price: number;
    clientId: string;
};

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
    const provisionService = {
        getById: async (id: string) => {
            return dataProvision.find((provision) => provision.id == id);
        },
    };
    test('Con un id va a obtener la informacion de un provision', async () => {
        const result = await getProvision({ 
            dependencies: { provisionService },
            payload: { id: '1' }
        });
       // 
        expect(result).toStrictEqual({
            id: '1',    
            /* title: 'Sample Provision',
            description: 'This is a sample provision description.',
            price: 100,
            clientId: 'client-123' */
        });
    }); 
    test('Con un id invalido deberia devolver un error', async () => {

    }); 
});