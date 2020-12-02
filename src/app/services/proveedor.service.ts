import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
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

  addProvider(provider): Observable<any> {
    return this.http
      .post<any>(this.url + 'addProveedor', provider, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getProviderId(idprovider): Observable<any> {
    return this.http
      .post<any>(this.url + 'findByIdProveedor', idprovider, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getProvider() {
    return this.http
      .get<any>(this.url + 'findAllProveedor')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  updateProvider(provider) {
    return this.http
      .put<any>(this.url + 'updateProveedor', provider, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  deleteProveedor(idproveedor) {
    return this.http.request('delete', this.url + 'deleteProveedor', {
      body: { id: idproveedor },
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
