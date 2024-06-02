import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(code: string): Observable<Login> {
    return this.http.post<Login>(`http://108.175.10.181:5000/api/v1/login`, { code: code });
  }
}
