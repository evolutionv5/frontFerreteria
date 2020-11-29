import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

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

  
  addProduct(product): Observable<any>{
    return this.http
      .post<any>(this.url + 'addProducto', product, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getProductId(idproduct): Observable<any>{
    return this.http
      .post<any>(this.url + 'findByIdProducto', idproduct, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getProduct(){
    return this.http
      .get<any>(this.url + 'findAllProducto')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  updateProduct(product){
    return this.http.put<any>(this.url + 'updateProducto', product, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
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
