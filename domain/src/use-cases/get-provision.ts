import { Provision } from "../entities";

interface  ProvisionService {
    getById(id: string): Promise<Provision | undefined>;
}


interface  GetProvisionData {
    dependencies: { provisionService: ProvisionService };
    payload: {
        id: string;
    };
}

export async function getProvision({ dependencies, payload }: GetProvisionData){
    await dependencies.provisionService.getById(payload.id);  
    return payload.id;

}