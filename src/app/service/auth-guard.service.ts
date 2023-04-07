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
      
    let url: string = state.url;
    return this.checkUserLogin(route, url)
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isAuthenticated()) {
      const roles = this.authService.getRoles();
      
      if (route.data['role'] && roles.indexOf(route.data['role']) === -1) { 
        this.router.navigate(['/task']);
        return false
      }
      return true
    }
    this.router.navigate(['/auth']);
    return false;
  }
}
