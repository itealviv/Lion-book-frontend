import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllAuthors().subscribe();
  }

}
