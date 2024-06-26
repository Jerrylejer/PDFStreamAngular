import { Alert } from "./alert.model";
import { Donation } from "./donation.model";
import { Evaluation } from "./evaluation.model";
import { Pdf } from "./pdf.model";
import { Role } from "./role.model";

export class User {
    id?: number;
    username?: String;
    password?: String;
    avatar?: File; 
    email?: String;
    bio?: String;
    roles?:Role[];
    createdAt?: Date;
    updatedAt?: Date
    donationsByDonor?: Donation[];
    donationsByBeneficiary?: Donation[];
    evaluations?: Evaluation[];
    pdfs?: Pdf[];
    alertList?: Alert[]
}
