import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class BillingService {

  private URI = 'http://localhost:8081/billing';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET costing from the server */
  getLastmonthBills(): Observable<any[]> {
    return this.http.get<any[]>(this.URI + "/lastmonth")
      .pipe();
  }
}
