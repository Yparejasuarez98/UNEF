import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { VoteDetail } from '../models/vote-detail';

@Injectable({
  providedIn: 'root'
})
export class VoteDetailService {

  constructor(private http: HttpClient) { }

  getList(): Observable<VoteDetail> {
    return this.http.get<any>(`/api/v1/vote?round=1`).pipe(map(res => {
      return res.data;
    }));
  }
}
