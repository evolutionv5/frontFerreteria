import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

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

  addOrder(order): Observable<any>{
    return this.http
      .post<any>(this.url + 'addPedido', order, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getOrderId(idorder): Observable<any>{
    return this.http
      .post<any>(this.url + 'findByIdPedido', idorder, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getOrders(){
    return this.http
      .get<any>(this.url + 'findAllPedido')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  updateOrder(order){
    return this.http.put<any>(this.url + 'updatePedido', order, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  deletePedido(idpedido) {
    return this.http.request('delete', this.url + 'deletePedido', {
      body: { id: idpedido },
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
