import { Pdf } from "./pdf.model";
import { User } from "./user.model";

export class Donation {
    id?: number;
    amount?: number;
    message?: String;
    createdAt?: Date;
    beneficiary?: User;
    donor?: User;
    pdf?: Pdf
}
