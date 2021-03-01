import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Candidate } from 'src/app/shared/models/candidate.model';
import { serverUrls } from 'src/app/shared/utils/constants/app-urls';
import { candidatesMock } from 'src/app/shared/utils/mocks/candidates.mock';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Candidate[]>{
    return this.http.get<Candidate[]>(serverUrls.candidates);
  }


  updateCandidate(candidate: Candidate): Observable<Candidate>{
    return this.http.put<Candidate>(
      `${serverUrls.candidates}${candidate._id}`,
      candidate
    );
  }

}
