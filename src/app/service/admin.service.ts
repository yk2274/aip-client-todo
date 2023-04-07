import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly api = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<String[]> {
    return this.http.get<String[]>(this.api)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => new Error(`Error status: ${error.status}, Error message: ${error.message}`))
  }
}
