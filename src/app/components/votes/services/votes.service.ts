import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AsignVote, Votes, Vowel } from '../models/votes';
import { ResponseData, Result } from '../../../shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  constructor(private http: HttpClient) { }

  getUserInfo(round: number): Observable<Votes> {
    return this.http.get<ResponseData>(`http://108.175.10.181:5000/api/v1/user-info?round=${round}`).pipe(
      map(res => {
        return res.data;
      })
    );
  }

  getVowelList(round: number, name: string): Observable<Vowel[]> {
    return this.http.get<ResponseData>(`http://108.175.10.181:5000/api/v1/vowel?round=${round}&name=${name}`).pipe(
      map(res => {
        return res.data;
      })
    );
  }

  asignVote(data: AsignVote): Observable<Result> {
    return this.http.post<Result>(`http://108.175.10.181:5000/api/v1/vote`, data);
  }
}
