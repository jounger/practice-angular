import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ServiceService {

  private costingUrl = 'http://localhost:8081/services/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET costing from the server */
  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.costingUrl)
      .pipe();
  }

  /** GET Costing by id. Will 404 if id not found */
  // getCosting(id: number): Observable<Costing> {
  //   const url = `${this.costingUrl}/${id}`;
  //   return this.http.get<Costing>(url).pipe(
  //     tap(_ => this.log(`fetched Costing id=${id}`)),
  //     catchError(this.handleError<Costing>(`getCosting id=${id}`))
  //   );
  // }
}
