import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private rol: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }
  

  getRol(): Observable<string> {
    return this.rol.asObservable();
  }

  setRol(rol: any): void {
    this.rol.next(rol);
  }
}
