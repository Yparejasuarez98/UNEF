import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseData } from '../../../shared/models/response';
import { Enterprise, EnterpriseAsist, EnterpriseDelegate, Section } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class VotesAdminService {

  constructor(private http: HttpClient) { }

  getEnterprise(section: string, typeVote: string, page: number, totalPage: number): Observable<Enterprise[]> {
    return this.http.get<ResponseData>(`http://108.175.10.181:5000/api/v1/enterprise?section=${section}&type_vote=${typeVote}&page=${page}&total _page=${totalPage}`).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  getSections(): Observable<Section[]> {
    return this.http.get<ResponseData>(`http://108.175.10.181:5000/api/v1/sections`).pipe(
      map((res) => {
        return res.data;
      })
    );;
  }

  updateEnterpriseAsist(data: EnterpriseAsist) {
    return this.http.patch(`http://108.175.10.181:5000/api/v1/enterprise`, data)
  }

  updateEnterpriseDelegate(data: EnterpriseDelegate) {
    return this.http.patch(`http://108.175.10.181:5000/api/v1/enterprise`, data)
  }
}
