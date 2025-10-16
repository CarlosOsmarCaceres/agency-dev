import { Provision } from "../entities";

export interface  ProvisionService {
    getByIdd(id: string): Promise<Provision | undefined>;
}