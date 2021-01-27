import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {

  private URI = 'http://localhost:8081/user';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET costing from the server */
  getCurrentUser(): Observable<any[]> {
    return this.http.get<any[]>(this.URI)
      .pipe();
  }
}
