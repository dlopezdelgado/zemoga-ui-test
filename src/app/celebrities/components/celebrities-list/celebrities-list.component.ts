import { Component, OnInit } from '@angular/core';
import { Celebrity } from 'src/app/shared/models/celebrity.model';
import { celebritiesMock } from 'src/app/shared/utils/mocks/celebrities.mock';
import { CloneDataInDeep } from 'typescript-clone-data-in-deep';

@Component({
  selector: 'app-celebrities-list',
  templateUrl: './celebrities-list.component.html',
  styleUrls: ['./celebrities-list.component.scss']
})
export class CelebritiesListComponent implements OnInit {

  celebrities: Celebrity[] = celebritiesMock;

  constructor() { }

  ngOnInit(): void {
    this.listCelebrities();
  }

  listCelebrities(): void {
    console.log(this.celebrities);
  }

}
