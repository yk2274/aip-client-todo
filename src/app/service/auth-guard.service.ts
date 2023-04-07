import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  token = localStorage.getItem('jwt_token')
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    
    return this.authService.isAuthenticated() ? true : this.router.parseUrl('/auth');
  }
}
