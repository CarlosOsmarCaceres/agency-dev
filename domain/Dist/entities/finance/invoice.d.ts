import { Entity } from "../../utils/type/entity.js";
import { Client } from "../users/client.js";
import { Project } from "../business/project.js";
export declare const InvoiceStatuses: {
    readonly DRAFT: "Borrador";
    readonly PENDING: "Pendiente";
    readonly PAID: "Pagada";
    readonly OVERDUE: "Vencida";
    readonly CANCELLED: "Anulada";
};
export type InvoiceStatus = (typeof InvoiceStatuses)[keyof typeof InvoiceStatuses];
export interface Invoice extends Entity {
    clientId: Client['id'];
    projectId: Project['id'];
    amount: number;
    status: InvoiceStatus;
    issueDate: Date;
    dueDate: Date;
}
//# sourceMappingURL=invoice.d.ts.map