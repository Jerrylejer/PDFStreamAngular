import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { Pdf } from 'src/app/models/pdf.model';
import { PdfService } from 'src/app/services/pdf/pdf.service';

@Component({
  selector: 'app-page-pdf',
  templateUrl: './page-pdf.component.html',
  styleUrl: './page-pdf.component.css'
})
export class PagePdfComponent implements OnInit {

  // Je stocke l'id du pdf issue de la route
  pdfId?: string;
  // Je stocke les datas du pdf sélectionné pour les utiliser dans mon template
  pdfDatas?: Pdf;

  // J'injecte mon PdfService pour utiliser ma requête "download" + "getPdfById"
  // J'injecte ActivatedRoute pour interagir avec le param de la route
  constructor(private pdfService: PdfService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
      // Je charge les données du pdf sélectionné
      this.activatedRoute.paramMap.pipe(
        switchMap((params: ParamMap) => {
          console.log(params);
          this.pdfId = params.get('pdfId')!;
          return this.pdfService.getPdfById(Number(this.pdfId)).pipe(
            catchError((error) => {
              return throwError(() => error);
            })
            );
          })
      ).subscribe(
        targetedPdf => {
          console.log(targetedPdf);
          this.pdfDatas = targetedPdf;
        }
      )
  }

  downloadPdf(id: number | undefined): void {
    this.pdfService.downloadPdf(Number(this.pdfId)).pipe(
      catchError((error) => {
        return throwError(() => error)
      }
    ))
    .subscribe(
      response => {
        const fileNameFromURL = 'file';
        if(fileNameFromURL) {
          const contentType = response.headers.get("Content-Type");
          const blob = new Blob([response.body!], {type:contentType!})

          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileNameFromURL;

          link.click();

          window.URL.revokeObjectURL(link.href);
          link.remove();
        } else {
          console.log("unable to extract file");
        }
      }
    )
  }
}
