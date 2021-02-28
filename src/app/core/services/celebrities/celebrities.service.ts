import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Celebrity } from 'src/app/shared/models/celebrity.model';
import { serverUrls } from 'src/app/shared/utils/constants/app-urls';
import { celebritiesMock } from 'src/app/shared/utils/mocks/celebrities.mock';

@Injectable({
  providedIn: 'root'
})
export class CelebritiesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Celebrity[]>{
    return this.http.get<Celebrity[]>(serverUrls.celebrities);
  }

  voteCelebrity(celebrity: Celebrity): Observable<Celebrity>{
    return of(celebrity);
  }

  // getAllLocal(): Observable<Celebrity[]>{
  //   return from(localStorage.getItem('celebrities')).pipe(
  //     map(result => result as Celebrity)
  //   );
  // }

  // fillDataInLocalStorage(): void {
  //   localStorage.setItem('celebrities', JSON.stringify(celebritiesMock));
  // }

}
