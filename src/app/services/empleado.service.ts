import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Empleado } from '../models/empleado.interface';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
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

  addEmployee(employee): Observable<Empleado>{
    return this.http
      .post<any>(this.url + 'addEmpleado', employee, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getEmployeeId(idemployee): Observable<Empleado>{
    return this.http
      .post<any>(this.url + 'findByIdEmpleado', idemployee, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getEmployees(){
    return this.http
      .get<Empleado[]>(this.url + 'findAllEmpleado')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  updateEmployee(employee){
    return this.http.put<any>(this.url + 'updateEmpleado', employee, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteEmployee(idemployee){
    return this.http.delete<any>(this.url + 'deleteEmpleado'+ {id: idemployee});
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
