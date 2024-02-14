import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-convention',
  templateUrl: './convention.component.html',
  styleUrl: './convention.component.css'
})
export class ConventionComponent implements OnInit{

  constructor(private articleService: ArticleService){}

  // Propriété qui stocke les articles 
  articles: Article[] = [];

  ngOnInit(): void {
      // Je récupère ma liste d'articles via mon service
      this.articleService.getArticlesList().pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.articles = response;
      }
      )
  }
}
