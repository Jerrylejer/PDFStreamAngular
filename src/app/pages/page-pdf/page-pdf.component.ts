import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, catchError, switchMap, throwError } from 'rxjs';
import { Pdf } from 'src/app/models/pdf.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PdfService } from 'src/app/services/pdf/pdf.service';

@Component({
  selector: 'app-page-pdf',
  templateUrl: './page-pdf.component.html',
  styleUrl: './page-pdf.component.css'
})
export class PagePdfComponent implements OnInit {
  // Boolean => switcher l'affichage des btns (connexion/télécharger => déconnexion/inscription)
  isConnectedUser!: boolean;
  // Je stocke l'id du pdf issue de la route
  pdfId?: string;
  // Je stocke les datas du pdf sélectionné pour les utiliser dans mon template
  pdfDatas?: Pdf;
  pdfPreview: any;
  // J'injecte mon PdfService pour utiliser ma requête "download" + "getPdfById"
  // J'injecte ActivatedRoute pour interagir avec le param de la route
  constructor(private pdfService: PdfService, private activatedRoute: ActivatedRoute, private auth: AuthService, private router: Router){}

  ngOnInit(): void {
      // Dans authService, "isConnected$" renvoie la valeur de this.isConnectedSubject = new BehaviorSubject<boolean>()
      // this.isConnectedSubject = new BehaviorSubject<boolean>() va être modifié par les méthodes connexionUser() & logoutUser() du Header
      // Si modif, je communique la valeur modifiée de "isConnected$ à "isConnected" 
      // Puis j'affecte la valeur de "isConnected => " à "this.isConnectedUser"
      this.auth.isConnected$.subscribe(isConnected => {
        this.isConnectedUser = isConnected;
      });
      
      // Je charge les données du pdf + image preview sélectionné (ForkJoin pour 2 requêtes en une -> service)
      this.activatedRoute.paramMap.pipe(
        switchMap((params: ParamMap) => {
          console.log(params);
          this.pdfId = params.get('pdfId')!;
          return this.pdfService.getPdfAndPreview(Number(this.pdfId)).pipe(
            catchError((error) => {
              return throwError(() => error);
            })
            );
          })
      ).subscribe(
        targetedPdf => {
        console.log(targetedPdf);
        // J'accède aux détails du pdf
        this.pdfDatas = targetedPdf.pdfDetails;
        // J'accède à l'image de preview du pdf
        const reader = new FileReader();
        reader.readAsDataURL(targetedPdf.pdfPreview);
        reader.onloadend = () => {
          this.pdfPreview = reader.result;
        };
        }
      );
  }


  downloadPdf(id: string | undefined): void {
    this.pdfService.downloadPdf(Number(id)).pipe(
      catchError((error) => {
        return throwError(() => error)
      }
    ))
    .subscribe(
      response => {
        const responseHeaders = response.headers;
        // Je ne récupère pas le filename dans "ContentDisposition" ...
        console.log(responseHeaders);
        // Diversion pour setter le nom du fichier car impossible via "ContentDisposition"
        const fileName = String(this.pdfDatas?.title);
        if(fileName) {
          // Je récupère le type de contenu de la réponse HTTP
          const contentType = response.headers.get("Content-Type");
          // Je créé un Blob grâce à HttpResponse<Blob>.body: Blob stocké dans les headers ()
          const blob = new Blob([response.body!], {type:contentType!})
          // Je crée un élément de type <a> + un lien href vers le contenu du fichier
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          // J'affecte le title du fichier à l'attribut "download" du lien créé
          // <a href="blob:http://localhost:4200/f8d13b05-e134-48cb-a852-705ca8907448" download="La syntaxe JavaScript – Kourou.pdf"></a>
          link.download = fileName;
          console.log(link);
          // Evenement click lance le lien
          link.click();
          // Je supprime le lien créé
          window.URL.revokeObjectURL(link.href);
          link.remove();
        } else {
          console.log("unable to extract file");
        }
      }
    )
  }

    // Redirection vers la page de compte (mode connecté et au click "compte")
    routerInscription() {
      this.router.navigate(["/inscription"]);
    }
}
