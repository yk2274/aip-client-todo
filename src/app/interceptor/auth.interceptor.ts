import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem("jwt_token");
    if (jwtToken) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization",
          "Bearer " + jwtToken)
      });  
      return next.handle(cloned);
    }
    else {      
      return next.handle(request);
    }
  }
}
