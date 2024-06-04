import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { VoteDetail } from '../models/vote-detail';

@Injectable({
  providedIn: 'root'
})
export class VoteDetailService {

  constructor(private http: HttpClient) { }

  getList(round: number): Observable<VoteDetail> {
    return this.http.get<any>(`http://108.175.10.181:5000/api/v1/user/vote?round=${round}`).pipe(map(res => {
      return res.data;
    }));
  }
}
