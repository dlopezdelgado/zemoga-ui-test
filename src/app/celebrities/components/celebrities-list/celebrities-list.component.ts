import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CelebritiesHandler } from 'src/app/app-store/celebrities/handler/celebrities.handler';
import { Celebrity } from 'src/app/shared/models/celebrity.model';
import { SubCollection } from 'src/app/shared/utils/rx/sub-collection';

@Component({
  selector: 'app-celebrities-list',
  templateUrl: './celebrities-list.component.html',
  styleUrls: ['./celebrities-list.component.scss']
})
export class CelebritiesListComponent implements OnInit, OnDestroy {

  celebrities: Celebrity[] | undefined;

  subs = new SubCollection();

  constructor(
    public celebritiesHandler: CelebritiesHandler
  ) { }

  ngOnInit(): void {
    this.dispatchGetCelebrities();
    this.getCelebrities();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  dispatchGetCelebrities(): void {
    this.celebritiesHandler.loadCelebrities();
  }

  getCelebrities(): void {
    this.subs.add = this.celebritiesHandler.getCelebrities$.pipe(
      tap((celebrities) => this.celebrities = celebrities)
    ).subscribe();
  }

}
