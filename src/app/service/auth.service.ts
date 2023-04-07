import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Auth } from '../interface/auth';
import { Router } from '@angular/router';
import { Token } from '../interface/token';
import jwt_decode from "jwt-decode";
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, public router: Router) { }

  authenticate(loginDetails: Auth): Observable<Auth> {
    return this.http.post<Auth>(this.api, loginDetails)
      .pipe(
        tap((res: any) => {
          const expiresAt = moment().add(res.expiresIn, 'second');
          localStorage.setItem('jwt_token', res.jwtToken);
          localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        }),
        catchError(this.handleError)
      )
  }

  decode(token: string): Token {
    return jwt_decode(token);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('jwt_token') !== null ? true : false
  }

  getUsername(): string {
     const token = localStorage.getItem('jwt_token')
     const decodedToken = this.decode(token as string)
     return decodedToken.sub;
  }

  getRoles(): string[] {
    const token = localStorage.getItem('jwt_token')
    const decodedToken = this.decode(token as string)
    return decodedToken.roles;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/')
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(`Error status: ${error.status}, Error message: ${error.message}`))
  }
}
