import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/api/';
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  addEmpleado(sala): Observable<any> {
    return this.http
      .post<any>(this.url + 'addEmpleado', sala, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  listarEmpleados(): Observable<any> {
    return this.http
      .get<any>(this.url + 'findAllSala')
      .pipe(retry(1), catchError(this.errorHandl));
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
