import { Article } from "./article.model";
import { Pdf } from "./pdf.model";
import { User } from "./user.model";

export class Alert {
    id?: number;
    title?: String;
    description?: String;
    state?: String;
    createdAt?: Date;
    updatedAt?: Date;
    alertLauncher?: User;
    charteArticle?: Article;
    pdf?: Pdf
}
