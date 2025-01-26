import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ToDo } from '../models/ToDo';
import { catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  apiUrl: string = 'http://localhost:3000/todos';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.apiUrl)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // Create
  create(data: any): Observable<ToDo> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post<ToDo>(API_URL, data)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  // Update
  update(id: any, data: ToDo): Observable<ToDo> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http.put<ToDo>(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorHandler)
    )
  }

  // Delete
  delete(id: any): Observable<any> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorHandler)
    )
  }

  // Handle API errors
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}



