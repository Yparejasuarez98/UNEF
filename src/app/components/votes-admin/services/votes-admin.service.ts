import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseData } from '../../../shared/models/response';
import { Enterprise } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class VotesAdminService {

  constructor(private http: HttpClient) { }

  getEnterprise(section: string, typeVote: string, page: number, totalPage: number): Observable<Enterprise[]> {
    return this.http.get<ResponseData>(`/api/v1/enterprise?section=${section}&type_vote=${typeVote}&page=${page}&total _page=${totalPage}`).pipe(
      map((res) => {
        return res.data;
      })
    );
  }
}
