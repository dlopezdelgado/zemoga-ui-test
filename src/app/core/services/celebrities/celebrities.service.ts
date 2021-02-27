import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Celebrity } from 'src/app/shared/models/celebrity.model';
import { serverUrls } from 'src/app/shared/utils/constants/app-urls';

@Injectable({
  providedIn: 'root'
})
export class CelebritiesService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Celebrity[]>{
    return this.http.get<Celebrity[]>(serverUrls.celebrities);
  }

}
