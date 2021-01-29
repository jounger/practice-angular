import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../login/login.component';


@Injectable({ providedIn: 'root' })
export class UserService {

  private URI = 'http://localhost:8081/user';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET costing from the server */
  getCurrentUser(): Observable<any[]> {
    return this.http.get<any[]>(this.URI, this.httpOptions)
      .pipe();
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.URI + "/login", user, this.httpOptions)
  }
}
