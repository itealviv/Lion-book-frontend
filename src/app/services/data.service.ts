import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Author {
  id: number;
  title: string;
  description: string;
  media: {
    id: number;
    path: string;
    size: number;
  };
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public authors: Author[] = [];

  public apiUrl = 'http://store-book.tk:8080/';

  constructor(private http: HttpClient) { }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl + 'authors').pipe(
      tap((authors: Author[]) => {
        console.log('getAllAuthors: ', authors);
        this.authors = authors;
      }),
      catchError(err => {
        console.log('Error getAllAuthors: ', err.message);
        return throwError(err);
      })
    );
  }
}
