import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from './global';
//import { Venta } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  addSale(sale): Observable<any> {
    return this.http
      .post<any>(this.url + 'addVenta', sale, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getSaleId(idsale): Observable<any> {
    return this.http
      .post<any>(this.url + 'findByIdVenta', idsale, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  /*getSale() {
    return this.http
      .get<Venta>(this.url + 'findAllVenta')
      .pipe(retry(1), catchError(this.errorHandl));
  }*/
  getSale(){
    return this.http
      .get<any>(this.url + 'findAllVenta')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  updateSale(sale) {
    return this.http
      .put<any>(this.url + 'updateVenta', sale, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  deleteVenta(idventa) {
    return this.http.request('delete', this.url + 'deleteVenta', {
      body: { id: idventa },
    });
  }
  
  // Error handling
  errorHandl(error): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
