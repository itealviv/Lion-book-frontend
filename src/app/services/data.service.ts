import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export interface Product {
    price: number;
    title: string;
    description: string;
    author: Author;
    media: string;
}

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

export interface User {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public authors: Author[] = [
    {
      id: 1,
      title: 'Local Руденко Максим',
      description: 'Local Найкращий письменник сучасності',
      media: {
        id: 1,
        path: '/var/logos/firstLogo',
        size: 123456
      }
    }
  ];
  public author: Author = {
    id: 1,
    title: 'Local Руденко Максим',
    description: 'Local Найкращий письменник сучасності',
    media: {
      id: 1,
      path: '/var/logos/firstLogo',
      size: 123456
    }
  };
  public apiUrl = 'http://store-book.tk:8080/';
  public logInCheck = new BehaviorSubject(null);
  public loggedCheck = false;
  public loggedUser: User = null;

  constructor(private http: HttpClient, private router: Router, private location: Location) { }

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

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(this.apiUrl + 'author/' + id).pipe(
        tap((author: Author) => {
          console.log('getAuthor: ', author);
          this.author = author;
        }),
        catchError(err => {
          console.log('getAuthor: ', err.message);
          return throwError(err);
        })
    );
  }

  logIn(user: User) {
    return this.http.post<User>(this.apiUrl + 'login', user).subscribe(
        (data: User) => {
          console.log(data);
          this.logInCheck.next(data);
          if (data.login) {
            this.loggedCheck = true;
            console.log('logged as :', data.login);
            this.loggedUser = data;
          }
        },
        err => console.log(err)
    );
  }

  resetLogInCheck() {
    this.logInCheck.next('');
  }

  goBack() {
    this.location.back();
  }

  signOut() {
    this.loggedCheck = false;
    console.log('logged out');
    this.loggedUser = null;
  }
}
