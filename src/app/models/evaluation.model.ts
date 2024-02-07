import { Pdf } from "./pdf.model";
import { User } from "./user.model";

export class Evaluation {
    id?: number;
    title?: String;
    comment?: String;
    star?: number;
    createdAt?: Date;
    updatedAt?: Date;
    pdf?: Pdf;
    user?: User
}
