import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Cliente } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
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

  addClient(client): Observable<any> {
    return this.http
      .post<any>(this.url + 'addCliente', client, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getClientId(idclient): Observable<any> {
    return this.http
      .post<any>(this.url + 'findByIdCliente', idclient, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getClients() {
    return this.http
      .get<Cliente>(this.url + 'findAllCliente')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  updateClient(client) {
    return this.http
      .put<any>(this.url + 'updateCLiente', client, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  deleteClient(idclient) {
    return this.http.delete<any>(this.url + 'deleteCliente' + { id: idclient });
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
