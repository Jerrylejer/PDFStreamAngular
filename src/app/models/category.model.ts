import { Pdf } from "./pdf.model";

export class Category {
    id?: number;
    title?: string;
    parentId?: Category;
    children?: Category[];
    createdAt?: Date;
    updatedAt?: Date;
    pdfList?: Pdf[]
}
