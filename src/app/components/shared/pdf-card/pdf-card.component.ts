import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Pdf } from 'src/app/models/pdf.model';

@Component({
  selector: 'app-pdf-card',
  templateUrl: './pdf-card.component.html',
  styleUrl: './pdf-card.component.css'
})
export class PdfCardComponent {

  @Input() thisCategoryPdfsList:Pdf[] = [];
  // Pour récupérer l'id catégory dans le routerLink
  @Input() parentCategory?: Category;
  // 
  mimeTypes: string[] = ["image/jpeg", "image/png"]; 

  // Transformer le FILE reçu en Blob puis en une url avec createObjectURL
  getPdfImageUrl(imageBytes: File): string {
    console.log(imageBytes);
    let blob = new Blob([imageBytes], { type: this.mimeTypes.join(",") }); 
    return URL.createObjectURL(blob);
  }
}
