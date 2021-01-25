import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class InstanceService {

  private URI = 'http://localhost:8081/services/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET costing from the server */
  getInstances(): Observable<any[]> {
    return this.http.get<any[]>(this.URI)
      .pipe();
  }

  /** GET Costing by id. Will 404 if id not found */
  getInstanceByServiceId(id: number): Observable<any> {
    const url = `${this.URI}/${id}/instances`;
    return this.http.get<any>(url).pipe();
  }
}
