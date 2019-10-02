import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsComponent } from './authors/authors.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthorComponent } from './author/author.component';

@NgModule({
  declarations: [AuthorsComponent, HomeComponent, NotFoundComponent, AuthorComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
