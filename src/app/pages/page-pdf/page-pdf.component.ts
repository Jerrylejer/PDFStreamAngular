import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, throwError } from 'rxjs';
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
  // Boolean pour rendre la modale visible ou non au click
  displayDownloadModaleStyle = "none"
  // Boolean pour ngIf spinner
  isLoading: boolean = false;

  // J'injecte mon PdfService pour utiliser ma requête "download" + "getPdfById"
  // J'injecte ActivatedRoute pour interagir avec le param de la route
  constructor(private pdfService: PdfService, 
    private activatedRoute: ActivatedRoute, 
    private auth: AuthService, 
    private router: Router, private toast: ToastrService){}

  // Manipulation de la modale de téléchargement
  openDownloadModale() {
    this.displayDownloadModaleStyle = "block";
  }

  closeDownloadModale() {
    this.displayDownloadModaleStyle = "none";
  }

  ngOnInit(): void {
      // Dans authService, "isConnected$" renvoie la valeur de this.isConnectedSubject = new BehaviorSubject<boolean>()
      // this.isConnectedSubject = new BehaviorSubject<boolean>() va être modifié par les méthodes connexionUser() & logoutUser() du Header
      // Si modif, je communique la valeur modifiée de "isConnected$ à "isConnected" 
      // Puis j'affecte la valeur de "isConnected => " à "this.isConnectedUser"
      this.auth.isConnected$.subscribe(isConnected => {
        this.isConnectedUser = isConnected;
      });
      // Tant que les données ne sont pas chargées, j'affiche le spinner
      this.isLoading = true;
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
          // Succès de la requête, je supprime le spinner
          this.isLoading = false;
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
        this.toast.warning("Une erreur est survenue, merci de recommencer !");
        return throwError(() => error)
      }
    ))
    .subscribe(
      response => {
        // Récupération dans fileName du pdf + l'image de preview via le service getPdfAndPreview(id: number)
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
          link.download = fileName;
          // < href="blob:http://localhost:4200/f8d13b05-e134-48cb-a852-705ca8907448" download="La syntaxe JavaScript – Kourou.pdf">
          console.log(link);
          // Evenement click lance le lien
          link.click();
          // Je supprime le lien créé
          window.URL.revokeObjectURL(link.href);
          link.remove();
          // Je ferme la modale
          this.closeDownloadModale();
          this.toast.success("Well done ! Votre pdf se trouve dans votre dossier des téléchargements !");
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

    // Aller sur la page de l'auteur
    goToAuthorPage(id: number | undefined): void {
      // pdfDatas me permet de récupérer les infos de l'author
      // Je récupère depuis mon html l'id de l'author et le passe en param de ma méthode
      this.router.navigate(["/author", id]);
    }
}
