import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Auth } from '../interface/auth';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = 'http://localhost:8080/auth';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, public router: Router) { }

  authenticate(loginDetails: Auth): Observable<Auth> {
    return this.http.post<Auth>(this.api, loginDetails, this.httpOptions)
      .pipe(
        tap((res: any) => {
          const expiresAt = moment().add(res.expiresIn, 'second');
          localStorage.setItem('jwt_token', res.jwtToken);
          localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        }),
        catchError(this.handleError)
      )
  }

  getToken() {
    return localStorage.getItem('jwt_token');
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/')
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(`Error status: ${error.status}, Error message: ${error.message}`))
  }
}
